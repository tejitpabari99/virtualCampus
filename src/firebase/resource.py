from typing import List, Dict

class Links(object):

    def __init__(self, cardLink:str, website:str):
        self._cardLink = cardLink
        self._website = website

    @staticmethod
    def from_dict(links_dict: Dict[str,str]):
        return Links(
            cardLink=links_dict["cardLink"],
            website=links_dict["website"]
        )

    def to_dict(self) -> Dict[str,str]:
        return {
            "cardLink": self.cardLink,
            "website": self.website
        }
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, Links):
            return False
        return self.cardLink == other.cardLink and self.website == other.website
    
    def __hash__(self):
        return hash((self.cardLink, self.website))

    @property
    def cardLink(self) -> str:
        return self._cardLink

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
        return Resource(
        title=resource_dict["title"], 
        reviewed=resource_dict["reviewed"], 
        description=resource_dict["description"], 
        img=resource_dict["img"], 
        category=resource_dict["category"]["category"], 
        tags=resource_dict["category"]["tags"], 
        links=Links.from_dict(resource_dict["links"])
        )

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
        return hash(self.title)

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
        return self._tags

    @property
    def links(self) -> Dict[str,str]:
        return self._links