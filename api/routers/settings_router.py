import json

from django.http import HttpResponse
from django.shortcuts import render

from api.calls.election_call import delete_campaign
from api.calls.home_call import get_schedule
from api.calls.settings_call import *
from api.routers.router import restrictRouter, validate_keys


@restrictRouter(allowed=["GET", "POST"])
def settingsRouter(request):
    """
    Allow members to get and edit their own settings.
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    if request.method == "GET":
        dict_get = dict(request.GET.items())
        id = dict_get.get('id', None)
        if id is None:
            return HttpResponse(json.dumps({"status": "down", "message": "No such member"}),
                                content_type="application/json")
        return member_config(id)
    elif request.method == "POST":
        dict_post = dict(request.POST.items())
        id = dict_post.get('id', None)
        if id is None:
            return HttpResponse(json.dumps({"status": "down", "message": "No such member"}),
                                content_type="application/json")
        return member_config_edit(id, dict_post)


@restrictRouter(allowed=["GET"])
def settingsBoardMemberRouter(request):
    """
    Allow board members to get boardmember-exclusive-info in settings
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    dict_get = dict(request.GET.items())
    id = dict_get.get('id', '')
    if not is_board_member(id):
        return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
                            content_type="application/json")

    if request.method == "GET":
        return board_member_config()


@restrictRouter(allowed=["POST"])
def settingsPromoteMemberRouter(request):
    """
    Allow board members to promote interested->member, member->board member (Removed board member check for testing)
    :param request:
    :return:
    """
    if request.method == "POST":
        dict_post = dict(request.POST.items())
        p_id = dict_post.get('id', '')
        if p_id == '':
            return HttpResponse(json.dumps({"message": "Missing required param id"}), status=400, content_type='application/json')
        id = int(p_id)
        if is_board_member(id):
            job = dict_post.get('job', None)
            if job is None:
                return HttpResponse(json.dumps({"message": "Missing required param job"}), status=400, content_type='application/json')
            edit_boardmember_info(id, job)
        if is_member(id):
            job = dict_post.get('job', None)
            if job is None:
                return HttpResponse(json.dumps({"message": "Missing required param job"}), status=400, content_type='application/json')
            return promote_to_board_member(id, job)
        if is_interested(id):
            return promote_to_member(id)
        else:
            return HttpResponse(json.dumps({"message": "Person not found"}), status=400, content_type='application/json')


@restrictRouter(allowed=["POST", "DELETE"])
def settingsEditMemberRouter(request):
    """
    Allow board members to edit information of a member OR remove them from the club
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    # if not is_board_member(email):
    #     return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
    #                         content_type="application/json")

    if request.method == "POST":
        dict_post = dict(request.POST.items())
        p_email = dict_post.get('email', '')
        if p_email == '':
            return HttpResponse(json.dumps({"message": "Missing required param email"}), status=400, content_type='application/json')

        p_attr_to_change = dict_post.get('attr_to_change', '')
        p_new_value = dict_post.get('new_value', '')
        if p_attr_to_change == '' or p_new_value == '' or p_email:
            return HttpResponse(json.dumps({"message": "Missing required param attr_to_change or new_value"}), status=400, content_type='application/json')

        if is_board_member(p_email):
            return edit_boardmember_info(p_email, p_new_value)  # only attribute to edit is 'job'
        else:
            return edit_member_info(p_email, p_attr_to_change, p_new_value)

    elif request.method == "DELETE":
        dict_delete = json.loads(request.body.decode('utf8').replace("'", '"'))
        if not validate_keys(["email"], dict_delete):
            HttpResponse(json.dumps({'message': 'Missing parameters'}),
                         content_type='application/json', status=400)
        return remove_member(dict_delete['email'])

    dict_delete = json.loads(request.body.decode('utf8').replace("'", '"'))
    if not validate_keys(["job", "email"], dict_delete):
        HttpResponse(json.dumps({'message': 'Missing parameters'}),
                     content_type='application/json', status=400)
    return delete_campaign(dict_delete["email"], dict_delete["job"])


@restrictRouter(allowed=["POST"])
def settingsInterestedCreateRouter(request):
    """
    Allows board members to add people to the club. (Removed the board member check for testing)
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    # if not is_board_member(email):
    #     return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
    #                         content_type="application/json")

    dict_post = dict(request.POST.items())
    if request.method == "POST":
        p_first_name = dict_post.get('first_name', '')
        p_last_name = dict_post.get('last_name', '')
        p_formerBoardMember= dict_post.get('formerBoardMember', False)
        p_email = dict_post.get('email', None)
        if p_email is None:
            return HttpResponse(json.dumps({"message": "Missing required param interested_info"}), status=400, content_type='application/json')
        interested = Interested(p_first_name, p_last_name,
                                p_formerBoardMember, p_email)
        return add_interested(interested)


@restrictRouter(allowed=["GET", "POST", "DELETE"])
def settingsSchedulesRouter(request):
    """
    Allows board members to get the whole schedule and add to/edit/delete from schedule
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    # if not is_board_member(email):
    #     return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
    #                         content_type="application/json")
    dict_post = dict(request.POST.items())
    if request.method == "GET":
        schedule = get_schedule()
        if schedule:
            # Convert date format to be JSON serializable
            for s in schedule:
                s.__setitem__('date', s.get('date').strftime('%Y-%m-%dT%H:%M:%SZ'))
            context = {'status': 'up', 'schedule': schedule}
            return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            return HttpResponse(json.dumps({"status": "down", "message": "There is nothing in the schedule."}),
                                content_type="application/json")
    elif request.method == "POST":
        # INSERT or UPDATE
        p_date = dict_post.get('date', '')
        p_number_of_courts = dict_post.get('number_of_courts', 0)

        if p_date == '':
            return HttpResponse(json.dumps({"message": "Missing required param date"}), status=400, content_type='application/json')

        if schedule_date_exists(p_date):
            return edit_schedule(p_date, p_number_of_courts)
        else:
            return add_to_schedule(p_date, p_number_of_courts)
    elif request.method == "DELETE":
        dict_delete = json.loads(request.body.decode('utf8').replace("'", '"'))
        if not validate_keys(["date"], dict_delete):
            HttpResponse(json.dumps({'message': 'Missing parameters'}),
                         content_type='application/json', status=400)
        return delete_from_schedule(dict_delete["date"])


@restrictRouter(allowed=["GET", "POST"])
def settingsCourtRouter(request):
    """
    Allows board members to get the info on all courts and add/edit courts
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    # if not is_board_member(email):
    #     return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
    #                         content_type="application/json")
    if request.method == "GET":
        courts = get_all_courts()
        if courts:
            context = {'status': 'up', 'courts': courts}
            return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            return HttpResponse(json.dumps({"status": "down", "message": "There are no courts stored in the database."}),
                                content_type="application/json")
    elif request.method == "POST":
        dict_post = dict(request.POST.items())
        p_court_id = dict_post.get('court_id', '')
        if not validate_keys('court_id', dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameters'}),
                         content_type='application/json', status=400)
        if court_id_exists(p_court_id):
            p_attr_to_change = dict_post.get('attr_to_change', '')  # 'queue_id', 'number', or 'id'
            p_new_value = dict_post.get('new_value', '')
            if not validate_keys({'attr_to_change', 'new_value'}, dict_post):
                HttpResponse(json.dumps({'message': 'Missing parameters'}),
                             content_type='application/json', status=400)
            return edit_court_info(p_court_id, p_attr_to_change, p_new_value)
        else:
            p_queue_type = dict_post.get('queue', '')
            if not validate_keys({'queue'}, dict_post):
                HttpResponse(json.dumps({'message': 'Missing parameters'}),
                             content_type='application/json', status=400)
            return add_court(Court(id=p_court_id, queue=p_queue_type))


@restrictRouter(allowed=["GET"])
def settingsAvailableCourtsRouter(request):
    """
    Allows board members to get the available courts on a certain day from the schedule
    :param request:
    :return:
    """
    # email = request.session.get('email', '')
    email = 'ezhuang2@illinois.edu'
    if not is_board_member(email):
        return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
                            content_type="application/json")
    if request.method == "GET":
        dict_post = dict(request.GET.items())
        g_date = dict_post.get('date', '')
        if g_date == '':
            return HttpResponse(json.dumps({"message": "Missing required param date"}), status=400, content_type='application/json')
        return get_available_courts(g_date)


@restrictRouter(allowed=["GET", "POST"])
def settingsQueueRouter(request):
    # email = request.session.get('email', '')
    # email = 'ezhuang2@illinois.edu'
    # if not is_board_member(email):
    #     return HttpResponse(json.dumps({"status": "down", "message": "You are not a board member."}),
    #                         content_type="application/json")
    if request.method == "GET":
        queues = get_all_queues()
        if queues:
            context = {'status': 'up', 'queues': queues}
            return HttpResponse(json.dumps(context), content_type="application/json")
        else:
            return HttpResponse(json.dumps({"status": "down", "message": "There are no queues."}),
                                content_type="application/json")
    elif request.method == "POST":
        dict_post = dict(request.POST.items())
        p_queue_type = dict_post.get('queue_type', '')
        if not validate_keys('queue_type', dict_post):
            HttpResponse(json.dumps({'message': 'Missing parameters'}),
                         content_type='application/json', status=400)
        return add_queue(p_queue_type)


def settings(request):
    #remove_member('johndoe@email.com')
    add_interested(Interested('John', 'Doe', False, 'johndoe@email.com'))
    new_member_info = Member(0, False, '2018-03-20', 'My name is John Doe and I like badminton')
    promote_to_member('johndoe@email.com', new_member_info)
    #promote_to_board_member('johndoe@email.com', BoardMember('Test Job'))

    #edit_member_info('johndoe@email.com', 'private', True)
    #edit_bio('johndoe@email.com', 'edit 2')
    #edit_privacy('johndoe@email.com', False)

    #remove_member('johndoe@email.com')

    board_members = get_board_members()
    members = get_members()
    interested = get_interested()
    member_info = get_member_info('ezhuang2@illinois.edu')
    print(member_info[0].__getitem__('dateJoined'))
    member_info[0].__setitem__('dateJoined', member_info[0].__getitem__('dateJoined').strftime('%Y-%m-%dT%H:%M:%SZ'))

    #add_to_schedule('2018-03-21', 8)
    #edit_schedule('2018-03-21', 2)
    #delete_from_schedule('2018-03-21')
    schedule = get_schedule()

    add_queue('CASUAL')
    add_queue('RANKED')
    add_queue('KOTH')

    add_court(Court(1, 'CASUAL'))
    add_court(Court(2, 'RANKED'))
    add_court(Court(3, 'CASUAL'))
    add_court(Court(4, 'KOTH'))
    add_court(Court(5, 'RANKED'))
    add_court(Court(6, 'RANKED'))
    add_court(Court(7, 'RANKED'))
    add_court(Court(8, 'RANKED'))

    check_court_date = '2018-03-31'
    available_courts = {'date': check_court_date, 'courts': get_available_courts(check_court_date)}

    edit_court_info(1, 'queue_id', 'KOTH')
    all_courts = get_all_courts()

    is_bm = is_board_member('apoddar3@illinois.edu')

    context = {
        'board_members': board_members,
        'members': members,
        'interested': interested,
        'member_info': member_info,
        'schedule': schedule,
        'available_courts': available_courts,
        'all_courts': all_courts,
        'is_bm': is_bm
    }

    return render(request, 'api_settings.html', context)


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