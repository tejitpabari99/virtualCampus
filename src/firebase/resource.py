from typing import List, Dict

class Links(object):

    def __init__(self, androidLink:str, cardLink:str, facebook:str, iosLink:str, website:str):
        self._androidLink = androidLink
        self._cardLink = cardLink
        self._facebook = facebook
        self._iosLink = iosLink
        self._website = website

    @staticmethod
    def from_dict(links_dict: Dict[str,str]):
        return Links(
            links_dict["androidLink"],
            links_dict["cardLink"],
            links_dict["facebook"],
            links_dict["iosLink"],
            links_dict["website"]
        )

    def to_dict(self) -> Dict[str,str]:
        return {
            "androidLink": self.androidLink,
            "cardLink": self.cardLink,
            "facebook": self.facebook,
            "iosLink": self.iosLink,
            "website": self.website
        }
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, Links):
            return False
        return self.androidLink == other.androidLink and self.cardLink == other.cardLink and self.facebook == other.facebook and self.iosLink == other.iosLink and self.website == other.website
    
    def __hash__(self):
        return hash((self.androidLink, self.cardLink, self.facebook, self.iosLink, self.website))

    @property
    def androidLink(self) -> str:
        return self._androidLink

    @property
    def cardLink(self) -> str:
        return self._cardLink
    
    @property
    def facebook(self) -> str:
        return self._facebook
    
    @property
    def iosLink(self) -> str:
        return self._iosLink

    @property
    def website(self) -> str:
        return self._website

class Resource(object):
    
    def __init__(self, title:str, reviewed:bool, description:str, img:str, category:str, tags:List[str], links:Links):
        self._title = title
        self._reviewed = reviewed
        self._description = description
        self._img = img
        self._category = category
        self._tags = tags
        self._links = links

    @staticmethod
    def from_dict(resource_dict: Dict):
        return Resource(resource_dict["title"], 
        resource_dict["reviewed"], 
        resource_dict["description"], 
        resource_dict["img"], 
        resource_dict["category"]["category"], 
        resource_dict["category"]["tags"], 
        Links.from_dict(resource_dict["links"]))

    def to_dict(self) -> Dict:
        return {
            "category": {
                "category": self.category,
                "tags": self.tags
            },
            "description": self.description,
            "reviewed": self.reviewed,
            "img": self.img,
            "links": self.links.to_dict(),
            "title": self.title,
        }

    def __eq__(self, other) -> bool:
        if not isinstance(other, Resource):
            return False
        return self.title == other.title or self.links == other.links
    
    def __hash__(self):
        return hash((self.title, self.links))

    @property
    def title(self) -> str:
        return self._title

    @property
    def reviewed(self) -> bool:
        return self._reviewed

    @property
    def description(self) -> str:
        return self._description

    @property
    def img(self) -> str:
        return self._img

    @property
    def category(self) -> str:
        return self._category
    
    @property
    def tags(self) -> List[str]:
        return self._title

    @property
    def links(self) -> Dict[str,str]:
        return self._links