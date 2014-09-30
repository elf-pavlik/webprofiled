# profiled

simple web profiles daemon in node.js


## implementation status

* RDFa - serves profile with RDFa
* JSON-LD - content negotiation *Accept: application/ld+json*
* HTTP 303 - redirects pages without triailing slash to ones with trailing slash - experimental way to address *HTTPrange-14*


## plans

### patterns

* [PESOS](http://indiewebcamp.com/PESOS) - https://github.com/elf-pavlik/webprofiled/labels/PESOS
* [POSSE](http://indiewebcamp.com/POSSE) - https://github.com/elf-pavlik/webprofiled/labels/POSSE

### types

* [x] Person
 * [x] contactPoint / socialAccount (ContactPoint)
 * [x] habit / skill / interest (CognitiveCharacteristic)
 * [ ] memberOf (Organization)
 * [x] attendeeIn / organizerIn / performerIn / sponsorIn (Event)
 * [x] visited (Place)
 * [ ] seeks / makesOffer (Asset)
 * [ ] describedIn (CreativeWork)
* [ ] Organization
 * [ ] subOrganization (Organization)
 * [ ] member (Person)
 * [ ] seeks / makesOffer (Asset)
 * [ ] attendeeIn / organizerIn / performerIn / sponsorIn (Event)
* [ ] Event 
 * [ ] attendee / organizer / performer / sponsor (Person / Organization)
* [ ] Place
 * [ ] events (Event)
* [ ] Asset
 * [ ] location (Place)
* [ ] CognitiveCharacteristic (Habit, Skill, Interest)


## UI

### views

* list
* grid
* graph
* map
* calendar

### filters

* Person
* Organization
* Event
* Place


## similar projects

* jsonresume

