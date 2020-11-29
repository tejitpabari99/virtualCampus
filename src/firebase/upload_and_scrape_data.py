from bs4 import BeautifulSoup
from selenium import webdriver
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from login import uni, password

cred = credentials.Certificate("./FirestoreKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# run for students and faculty
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
# options.add_argument('--headless') to run without opening a window
# filepath is filepath to downloaded chrome driver
filepath = ""
driver = webdriver.Chrome(filepath, chrome_options=options)
# open up first page, A, on first subcategory
# example: "https://directory.columbia.edu/people/browse/students;jsessionid=6D5D6AEF2E64326C9390BD21CEC4368A?filter.lnameFname=2&filter.initialLetter=A"
driver.get("https://directory.columbia.edu/people/browse/facultyandstaff;jsessionid=6D5D6AEF2E64326C9390BD21CEC4368A?filter.lnameFname=2&filter.initialLetter=A")

# get past login page
uni = uni  # your uni
password = password  # your password
username_element = driver.find_element_by_id("username")
username_element.send_keys(uni)
password_element = driver.find_element_by_id("password")
password_element.send_keys(password)
driver.find_element_by_name("submit").click()
page_source = driver.page_source

# login page has closed
soup = BeautifulSoup(page_source, 'html.parser')
table = soup.body.div.a.form.table.tbody.contents[4].contents[1].div.table.tbody
# tbody is where all individual entries are contained as tr elements
people = table.contents
people.pop(0)  # remove first row of titles

# click on each person's link to full information, retrieve data
for c in people:
    inner_content = c.contents
    name = inner_content[0].a.string
    name_link = inner_content[0].a["href"]
    uni = name_link[name_link.find("=") + 1:]
    title = ""
    if len(inner_content[1].contents) <= 0:
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
    person = {u'name': unicode(name), u'UNI': unicode(uni), u'title': unicode(title), u'department': unicode(department), u'contact': unicode(contact)}
    db.collection(u'lionbook').add(person)

# loop through rest of subcategories
# driver.find_element_by_class_name("page_number_result") div contains all the links
current_num = 1
current_href = "?page=" + str(current_num)
while driver.find_elements_by_xpath('//a[@href="' + current_href + '"]') > 0:  # links to letter subcategories
    driver.find_element_by_xpath('//a[@href="' + current_href + '"]').click()
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    # tbody is where all individual entries are contained as tr elements
    table = soup.body.div.a.form.table.tbody.contents[4].contents[1].div.table.tbody
    people = table.contents
    people.pop(0)  # remove first row of titles
    # iterate through each person's entries table
    # retrieves data
    for c in people:
        inner_content = c.contents
        name = inner_content[0].a.string
        name_link = inner_content[0].a["href"]
        uni = name_link[name_link.find("=") + 1:]
        title = ""
        if len(inner_content[1].contents) <= 1:
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
        person = {u'name': unicode(name), u'UNI': unicode(uni), u'title': unicode(title),
                  u'department': unicode(department), u'contact': unicode(contact)}
        db.collection(u'lionbook').add(person)
    current_num = current_num + 1
    current_href = "?page=" + str(current_num)
