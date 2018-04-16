from django.http import HttpResponse

from api.calls.election_call import get_votes_from_member, get_all_votes
from api.cursor_api import deserializeDate
from api.utils import MemberClass
from api.routers.router import restrictRouter, auth_decorator, validate_keys, get_member_id_from_email
from api.cursor_api import *
from api.models import *


@auth_decorator(allowed=MemberClass.MEMBER)
@restrictRouter(allowed=["POST"])
def cast_vote(request):
    """
    POST -- Casts/updates a vote for the current election
        Required Keys: campaign_id
    :param request:
    :param job:
    :return:
    """
    dict_post = dict(request.POST.items())
    validate_keys("campaign_id", dict_post)

    voter_id = get_member_id_from_email(request.user.email)

    # @TODO need to add vote updating to this depending on the campaign job

    # add the vote
    query = """
            INSERT INTO api_vote(voter_id, campaign_id) VALUES(%s, %s)
            """
    response = run_connection(query, voter_id, dict_post["campaign_id"])
    return response


@auth_decorator(MemberClass.BOARD_MEMBER)
@restrictRouter(allowed=["GET"])
def get_votes_from_member(request, voter_id):
    """
    GET -- Gets votes of given member
        Required Keys: id
    :param request:
    :param voter_id:
    :return:
    """
    dict_get = dict(request.GET.items())
    idKey = "id"

    votes = Vote.objects.raw("SELECT * FROM api_vote WHERE voter_id = %s", [voter_id])

    context = {
        'votes': serializeSetOfModels(votes)
    }
    return http_response(context)


@auth_decorator(MemberClass.BOARD_MEMBER)
@restrictRouter(allowed=["GET"])
def all_votes(request):
    """
    GET - Gets all votes of the current election
        Required Keys: None
    :param request:
    :return:
    """
    elections = Election.objects.raw("SELECT * FROM api_election AS election\
            WHERE endDate IS NULL OR endDate >= date('now')\
            ORDER BY election.date DESC LIMIT 1;")
    if len(list(elections)) == 0:
        return http_response({}, message="No current election available")

    current_election = elections[0]

    campaigns = Campaign.objects.raw("SELECT * FROM api_campaign WHERE election_id = %s", [current_election.id])

    _all_votes = []
    for campaign in campaigns:
        votes = Vote.objects.raw("SELECT * FROM api_vote WHERE campaign_id = %s", [campaign.id])
        _all_votes = _all_votes + serializeSetOfModels(votes)

    all_votes_ever = Vote.objects.raw("SELECT * FROM api_vote")
    foo = serializeSetOfModels(all_votes_ever)

    context = {
        'all_votes': _all_votes
    }

    return http_response(context)