from typing import List, Dict
import datetime

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
    
    def __init__(self, title:str, reviewed:bool, want_support_with:str, this_resource_offers:str, description:str, img:str, category:str, tags:List[str], links:Links, date_created:datetime.datetime, ranking:int):
        self._title = title
        self._reviewed = reviewed
        self._want_support_with = want_support_with
        self._this_resource_offers = this_resource_offers
        self._description = description
        self._img = img
        self._category = category
        self._tags = tags
        self._links = links
        self._date_created = date_created
        self._ranking = ranking

    @staticmethod
    def from_dict(resource_dict: Dict):
        return Resource(
        title=resource_dict["title"], 
        reviewed=resource_dict["reviewed"], 
        want_support_with=resource_dict["descriptions"]["wantSupportWith"],
        this_resource_offers=resource_dict["descriptions"]["thisResourceOffers"],
        description=resource_dict["descriptions"]["description"], 
        img=resource_dict["img"], 
        category=resource_dict["category"]["category"], 
        tags=resource_dict["category"]["tags"], 
        links=Links.from_dict(resource_dict["links"]),
        date_created=resource_dict["dateCreated"],
        ranking=resource_dict["ranking"]
        )

    def to_dict(self) -> Dict:
        return {
            "category": {
                "category": self.category,
                "tags": self.tags
            },
            "descriptions": {
                "description": self.description,
                "wantSupportWith": self.want_support_with,
                "thisResourceOffers": self.this_resource_offers
            },
            "description": self.description,
            "reviewed": self.reviewed,
            "img": self.img,
            "links": self.links.to_dict(),
            "title": self.title,
            "dateCreated": self.date_created,
            "ranking": self.ranking
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
    def want_support_with(self) -> str:
        return self._want_support_with

    @property
    def this_resource_offers(self) -> str:
        return self._this_resource_offers
    
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

    @property
    def date_created(self) -> datetime.datetime:
        return self._date_created

    @property
    def ranking(self) -> int:
        return self._ranking