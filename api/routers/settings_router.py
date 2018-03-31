import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from api.calls.election_call import delete_campaign
from api.calls.home_call import get_schedule
from api.calls.settings_call import *
from api.routers.router import restrictRouter, validate_keys

@csrf_exempt
@restrictRouter(allowed=["GET", "POST"])
def settingsRouter(request):
    """
    Allow members to get and edit their own settings.
    Expect input/output dictionary to be of the form
    {
        'private': _,
        'bio': _
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8 # ezhuang2@illinois.edu
    if request.method == "GET":
        if session_id is None:
            return HttpResponse(json.dumps({"message": "No such member"}),
                                content_type="application/json")
        return member_config(session_id)
    elif request.method == "POST":
        dict_post = dict(request.POST.items())
        if not validate_keys(["private", "bio"], dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameters private or bio'}),
                         content_type='application/json', status=400)
        if session_id is None:
            return HttpResponse(json.dumps({"message": "No such member"}),
                                content_type="application/json")
        return member_config_edit(session_id, dict_post)


@csrf_exempt
@restrictRouter(allowed=["GET", "POST"])
def settingsBoardMemberRouter(request):
    """
    Allow board members to get/edit list of boardmembers.
    Expect input/output dictionary to be of the form
    {
        'boardmembers': [
            {
                'member_id': _
                'first_name': _
                'last_name': _
                'email': _
                'job': _
            },
            ...
        ]
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8  # ezhuang2@illinois.edu
    if not is_board_member(session_id):
        return HttpResponse(json.dumps({"message": "You are not a board member."}),
                            content_type="application/json")

    if request.method == "GET":
        return boardmembers_config()
    elif request.method == "POST":
        # Can only change their jobs
        dict_post = dict(request.POST.items())
        print(str(dict_post))
        if not validate_keys(["boardmembers"], dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameters member_id or job'}),
                         content_type='application/json', status=400)
        return boardmembers_config_edit(dict_post)


@csrf_exempt
@restrictRouter(allowed=["GET", "POST", "DELETE"])
def settingsAllMembersRouter(request):
    """
    Allows boardmembers to get/edit/delete information on all the people in the club (interested, members, boardmembers)
    Expect input/output dictionary to be of the form
    {
        'members': [
            {
                'member_id': _, (Used for promoting/demoting/deletion)
                'first_name': _,
                'last_name': _,
                'email': _,
                'status': _ (Interested, Member, Boardmember)
            },
            ...
        ]
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8  # ezhuang2@illinois.edu
    if not is_board_member(session_id):
        return HttpResponse(json.dumps({"message": "You are not a board member."}),
                            content_type="application/json")
    if request.method == "GET":
        return get_all_club_members()
    elif request.method == "POST":
        # Promote/demote members (Interested, Member, Boardmember)
        # Going to Boardmember, the default 'job'='OFFICER'
        dict_post = dict(request.POST.items())
        if not validate_keys(["members"], dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameters members'}),
                         content_type='application/json', status=400)
        return update_all_club_members_status(dict_post)
    elif request.method == "DELETE":
        # Here, the dictionary should ONLY contain the information for members that should be deleted
        # Remove people from the db completely
        dict_delete = json.loads(request.body.decode('utf8').replace("'", '"'))
        if not validate_keys(["members"], dict_delete):
            HttpResponse(json.dumps({'message': 'Missing parameter members'}),
                         content_type='application/json', status=400)
        return remove_member(dict_delete)


@csrf_exempt
@restrictRouter(allowed=["POST"])
def settingsInterestedCreateRouter(request):
    """
    Allows board members to add people to the club.
    Expect input dictionary to be of the form
    {
        'first_name': _,
        'last_name': _,
        'formerBoardMember': _,
        'email': _
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8  # ezhuang2@illinois.edu
    if not is_board_member(session_id):
        return HttpResponse(json.dumps({"message": "You are not a board member."}),
                            content_type="application/json")

    dict_post = dict(request.POST.items())
    if request.method == "POST":
        p_first_name = dict_post.get('first_name', '')
        p_last_name = dict_post.get('last_name', '')
        p_formerBoardMember= dict_post.get('formerBoardMember', False)
        p_email = dict_post.get('email', None)
        if p_email is None:
            return HttpResponse(json.dumps({"message": "Missing required param email"}), status=400, content_type='application/json')
        interested = Interested(p_first_name, p_last_name,
                                p_formerBoardMember, p_email)
        return add_interested(interested)


@csrf_exempt
@restrictRouter(allowed=["GET", "POST", "DELETE"])
def settingsSchedulesRouter(request):
    """
    Allows board members to get the whole schedule and add to/edit/delete from schedule
    Expect input/output dictionary to be of the form
    {
        'schedule': [
            {
                'date': _,
                'number_of_courts': _
            },
            ...
        ]
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8  # ezhuang2@illinois.edu
    if not is_board_member(session_id):
        return HttpResponse(json.dumps({"message": "You are not a board member."}),
                            content_type="application/json")
    dict_post = dict(request.POST.items())
    if request.method == "GET":
        return schedule_to_dict()
    elif request.method == "POST":
        # INSERT or UPDATE
        dict_post = dict(request.POST.items())
        if not validate_keys(["schedule"], dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameter schedule'}),
                         content_type='application/json', status=400)
        return addto_edit_schedule(dict_post)
    elif request.method == "DELETE":
        # The provided dictionary should ONLY contain information on the entries that are
        # intended to be deleted.
        dict_delete = json.loads(request.body.decode('utf8').replace("'", '"'))
        if not validate_keys(["schedule"], dict_delete):
            HttpResponse(json.dumps({'message': 'Missing parameter schedule'}),
                         content_type='application/json', status=400)
        return delete_multiple_from_schedule(dict_delete)


@csrf_exempt
@restrictRouter(allowed=["GET", "POST"])
def settingsCourtRouter(request):
    """
    Allows board members to get the info on all courts and add/edit courts.
    Expect the input/output dictionary to be of the form
    {
        'courts': [
            {
                'court_id': _,
                'queue_id': _
            },
            ...
        ]
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8  # ezhuang2@illinois.edu
    if not is_board_member(session_id):
        return HttpResponse(json.dumps({"message": "You are not a board member."}),
                            content_type="application/json")
    if request.method == "GET":
        return get_all_courts_formmated()
    elif request.method == "POST":
        # Used to add new courts OR change the queue types for the courts
        dict_post = dict(request.POST.items())
        if not validate_keys(['courts'], dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameter courts'}),
                         content_type='application/json', status=400)
        return addto_edit_courts_formatted(dict_post)


@csrf_exempt
@restrictRouter(allowed=["GET", "POST"])
def settingsQueueRouter(request):
    """
    Allows boardmembers to get all the current queues in db or add more queue types
    Expect the input/output dictionary to be of the form
    {
        'queues': [
            {
                'queue_id': _,
                'queue_type': _
            },
            ...
        ]
    }
    :param request:
    :return:
    """
    # session_id = request.session.get('session_id', None)
    session_id = 8  # ezhuang2@illinois.edu
    if not is_board_member(session_id):
        return HttpResponse(json.dumps({"message": "You are not a board member."}),
                            content_type="application/json")
    if request.method == "GET":
        return get_all_queues_formatted()
    elif request.method == "POST":
        # Used to add more queue types to the db
        dict_post = dict(request.POST.items())
        if not validate_keys('queues', dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameter queues'}),
                         content_type='application/json', status=400)
        return add_queues_formatted(dict_post)


class Interested(object):
    first_name = ''
    last_name = ''
    formerBoardMember = False
    email = ''

    def __init__(self, first_name, last_name, formerBoardMember, email):
        self.first_name = first_name
        self.last_name = last_name
        self.formerBoardMember = formerBoardMember
        self.email = email


class Member(object):
    level = ''
    private = False
    dateJoined = ''
    # queue = ''
    bio = ''

    def __init__(self, level, private, dateJoined, bio):
        self.level = level
        self.private = private
        self.dateJoined = dateJoined
        # self.queue = queue
        self.bio = bio


class BoardMember(object):
    job = ''

    def __init__(self, job):
        self.job = job


class Court(object):
    id = ''
    queue = ''

    def __init__(self, id, queue):
        self.id = id
        self.queue = queue