from django.test import TestCase
from api.models import *
import datetime
import api.datetime_extension

class CustomTestCase(TestCase):
    def assertGoodResponse(self, response):
        self.assertEqual(response.status_code, 200)
        json = response.json()
        self.assertEqual(json['message'], 'OK')

    def assertBadResponse(self, response):
        self.assertNotEqual(response.status_code, 200)

    def create_example_data(self):
        # Create some courts
        courts = []
        for i in range(8):
            courts.append(Court())
            courts[i].save()


        # Create some members
        members = []
        members.append(Member(first_name="Eddie", last_name="Huang", dateJoined=datetime.date.today(),
                              email="ezhuang2@illinois.edu"))
        members.append(Member(first_name="Bhuvan", last_name="Venkatesh", dateJoined=datetime.date.today(),
                              email="bhuvan2@illinois.edu"))
        members.append(Member(first_name="Daniel", last_name="Rong", dateJoined=datetime.date.today(),
                              email="drong4@illinois.edu"))
        members.append(Member(first_name="Grace", last_name="Shen", dateJoined=datetime.date.today(),
                              email="gshen3@illinois.edu"))
        members.append(Member(first_name="Jared", last_name="Franzone", dateJoined=datetime.date.today(),
                              email="jfranz2@illinois.edu"))

        for member in members:
            member.save()

        # Eddie has played many matches, an hour in total
        matches = []
        now = datetime.datetime.now(tz=api.datetime_extension.utc)
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-80),
                             endDateTime=now + datetime.timedelta(minutes=-70), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-70),
                             endDateTime=now + datetime.timedelta(minutes=-60), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-60),
                             endDateTime=now + datetime.timedelta(minutes=-50), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-50),
                             endDateTime=now + datetime.timedelta(minutes=-40), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-40),
                             endDateTime=now + datetime.timedelta(minutes=-30), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-30),
                             endDateTime=now + datetime.timedelta(minutes=-20), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-20),
                             endDateTime=now + datetime.timedelta(minutes=-10), scoreA=21, scoreB=19))
        matches.append(Match(startDateTime=now + datetime.timedelta(minutes=-10),
                             endDateTime=now + datetime.timedelta(minutes=-0), scoreA=21, scoreB=19))
        for match in matches:
            match.save()
            playedin = PlayedIn(member=members[0],match=match, team="A")
            playedin.save()

        # Bhuvan has played one match (10 minutes)
        playedin = PlayedIn(member=members[1], match=matches[0], team="A")
        playedin.save()

        # Dan has played one match (10 minutes)
        playedin = PlayedIn(member=members[2], match=matches[0], team="B")
        playedin.save()


        # Create a casual queue
        queue = Queue(type="CASUAL")
        queue.save()

        # Add the first four courts to the casual queue
        for i in range(4):
            courts[i].queue = queue
            courts[i].save()

        # Eddie is on the casual queue as a party of 1
        party = Party(queue=queue)
        party.save()
        members[0].party = party
        members[0].save()

        # Bhuvan and Dan are on the casual queue as a party of 2 (Bhuvan and Dan have priority)
        party = Party(queue=queue)
        party.save()
        members[1].party = party
        members[1].save()
        members[2].party = party
        members[2].save()

        # Create a tournament bracket with all of the children having a match
        tournament = Tournament(date=datetime.date.today())
        tournament.save()

        # Create a full tree of height 3
        for level in range(4):
            for sibling_index in range(2**level):
                bracket_node = BracketNode(tournament=tournament, level=level, sibling_index=sibling_index)
                bracket_node.save()

        for index in range(2**3):
            bracket_node = BracketNode.objects.get(tournament=tournament, level=3, sibling_index=index)
            match = matches[index]
            bracket_node.match = match






