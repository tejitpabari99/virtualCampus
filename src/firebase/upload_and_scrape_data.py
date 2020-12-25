from bs4 import BeautifulSoup
from selenium import webdriver
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./FirestoreKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
count = 0  # for ensuring that batched write does not pass 500-write limit
batch = db.batch()

# for looping through rest of subcategories from first subcategory
def more_subcategories():
    current_num = 1
    current_href = "?page=" + str(current_num)
    while len(driver.find_elements_by_xpath('//a[@href="' + current_href + '"]')) > 0:  # links to letter subcategories
        driver.find_element_by_xpath('//a[@href="' + current_href + '"]').click()
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        table = soup.body.div.a.form.table.tbody.contents[4].contents[1].div.table.tbody
        people = table.contents
        people.pop(0)
        scrape_table(people)
        current_num = current_num + 1
        current_href = "?page=" + str(current_num)


# for scraping table once table is identified
def scrape_table(people_list):
    for p in people_list:
        global count
        global batch
        inner_content = p.contents
        name = inner_content[0].a.string
        name_link = inner_content[0].a["href"]
        uni = name_link[name_link.find("=") + 1:]
        title = ""
        if len(inner_content[1].contents) <= 0 or len(inner_content[1].get_text().strip()) == 0:
            title = "null"
        else:
            for text in inner_content[1].contents[0].strings:
                title = title + text
        title = title[title.find(":") + 1:]
        department = ""
        if len(inner_content[1].contents) <= 1:
            department = "null"
        else:
            for text in inner_content[1].contents[1].strings:
                department = department + text
        department = department[department.find(":") + 1:]
        contact = ""
        for text in inner_content[3].strings:
            contact = contact + text
        phone = "null"
        if contact.find("+") != -1 and contact[contact.find("+") + 1:contact.find("+") + 2].isdigit():
            phone = contact[contact.find("+"):]
            contact = contact[0:contact.find("+")]
        contact = contact.strip()
        phone = phone.strip()
        if len(contact) == 0:
            contact = "null"
        if count == 500:
            batch.commit()
            batch = db.batch()
            count = 0
        person = {u'name': unicode(name), u'UNI': unicode(uni), u'title': unicode(title),
                  u'department': unicode(department), u'contact': unicode(contact), u'phone': unicode(phone)}
        new_ref = db.collection(u'lionbook').document()
        batch.set(new_ref, person)
        count = count + 1


# run for students and faculty
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
# options.add_argument('--headless') to run without opening a window
# filepath is filepath to downloaded chrome driver
filepath = "" # filepath of chromedriver
driver = webdriver.Chrome(filepath, chrome_options=options)
# "https://cas.columbia.edu/cas/login?TARGET=https%3A%2F%2Fdirectory.columbia.edu%2Fpeople%2Fbrowse%2Fstudents%3Ffilter.lnameFname%3D2%26filter.initialLetter%3DA"
# "https://cas.columbia.edu/cas/login?TARGET=https%3A%2F%2Fdirectory.columbia.edu%2Fpeople%2Fbrowse%2Ffacultyandstaff%3Ffilter.lnameFname%3D2%26filter.initialLetter%3DA"
driver.get("https://cas.columbia.edu/cas/login?TARGET=https%3A%2F%2Fdirectory.columbia.edu%2Fpeople%2Fbrowse%2Ffacultyandstaff%3Ffilter.lnameFname%3D2%26filter.initialLetter%3DA")

# get past login page
user = ""  # your uni
password = ""  # your password
username_element = driver.find_element_by_id("username")
username_element.send_keys(user)
password_element = driver.find_element_by_id("password")
password_element.send_keys(password)
driver.find_element_by_name("submit").click()
page_source = driver.page_source

# login page has closed
soup = BeautifulSoup(page_source, 'html.parser')
table = soup.body.div.a.form.table.tbody.contents[4].contents[1].div.table.tbody
people = table.contents  # tbody is where all individual entries are contained as tr elements
people.pop(0)  # remove first row of titles

# retrieve data from first subcategory page on first category page
scrape_table(people)  # something causes duplication here?
# loop through rest of subcategories in first category
# driver.find_element_by_class_name("page_number_result") div contains all the links
more_subcategories()

# proceed to next categories (eg: "B")
current_letter = "B"
current_href = "?filter.initialLetter=" + current_letter
while len(driver.find_elements_by_xpath('//a[@href="' + current_href + '"]')) > 0:  # links to letter subcategories
    driver.find_element_by_xpath('//a[@href="' + current_href + '"]').click()
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    table = soup.body.div.a.form.table.tbody.contents[4].contents[1].div.table.tbody
    people = table.contents
    people.pop(0)
    # retrieve data from opened subcategory page
    scrape_table(people)
    # proceed through rest of subcategories
    more_subcategories()
    current_letter = chr(ord(current_letter) + 1)
    current_href = "?filter.initialLetter=" + current_letter
batch.commit()
