import datetime

from django.test import TestCase
from django.urls import reverse

from api import cursor_api
from api.models import *
from .custom_test_case import *

class PartyTest(CustomTestCase):
    def test_get_party(self):
        self.create_example_data()
        eddie = Member.objects.get(first_name='Eddie')
        response = self.client.get(reverse('api:get_party_for_member', args=(eddie.id, )))
        self.assertGoodResponse(response)

        json = response.json()
        self.assertTrue('party' in json)

    def test_get_no_party(self):
        some_guy = Member(first_name='some', last_name='guy', dateJoined=datetime.date.today(), email='someguy@gmail.com')
        some_guy.save()

        response = self.client.get(reverse('api:get_party_for_member', args=(some_guy.id, )))

        json = response.json()
        self.assertTrue('party' not in json)

    def test_add_member_to_party(self):
        self.create_example_data()

        parties = Party.objects.all()

        self.assertGreaterEqual(len(list(parties)), 2)

        some_guy = Member(first_name='some', last_name='guy', dateJoined=datetime.date.today(),
                         email='someguy@gmail.com')
        some_guy.save()

        first_party = parties[0]
        second_party = parties[1]

        response = self.client.post(reverse('api:party_add_member'), {'party_id': first_party.id, 'member_id': some_guy.id})
        self.assertGoodResponse(response)

        guys_in_first_party = Member.objects.filter(party_id=first_party.id)
        self.assertEqual(len(list(guys_in_first_party)), 2)






