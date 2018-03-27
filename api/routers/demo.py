from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from api.calls.announcement_call import *
from api.routers.router import *
from api.routers.router import validate_keys
from django.shortcuts import render
from api.calls.election_call import *
from api.calls.match_call import *
from api.calls.match_call import create_match as call_create_match
from api.calls.match_call import delete_match as call_delete_match
import ast
from django.urls import reverse

@restrictRouter(allowed=["GET", "POST"])
def matches(request):
    response = get_all_matches()
    content = response.content.decode()

    context = json.loads(content)
    print(context)
    return render(request, 'api_matches.html', context)

@csrf_exempt
@restrictRouter(allowed=["POST"])
def delete_match(request):
    idKey = "id"
    dict_post = dict(request.POST.items())
    if not validate_keys([idKey], dict_post):
        return HttpResponse(json.dumps({'message': 'Missing parameters'}),
                            content_type='application/json', status=400)
    id = int(dict_post[idKey])
    response = call_delete_match(id)
    return HttpResponseRedirect(reverse('api:demo_matches'))

@csrf_exempt
@restrictRouter(allowed=["GET", "POST"])
def create_match(request):
    if request.method == "GET":
        all_members = Member.objects.raw("SELECT * FROM api_member")
        s_members = serializeSetOfModels(all_members)
        context = {
            "members": s_members
        }
        return render(request, 'api_matches_create.html', context)
    elif request.method == "POST":
        scoreAKey = "scoreA"
        scoreBKey = "scoreB"
        playerAKey = "playerA"
        playerBKey = "playerB"

        dict_post = dict(request.POST.items())
        if not validate_keys([scoreAKey, scoreBKey, playerAKey, playerBKey], dict_post):
            return HttpResponse(json.dumps({'message': 'Missing parameters'}),
                                content_type='application/json', status=400)
        score_a = int(dict_post[scoreAKey])
        score_b = int(dict_post[scoreBKey])
        response = call_create_match(score_a, score_b, [dict_post[playerAKey]], [dict_post[playerBKey]])
        return HttpResponseRedirect(reverse('api:demo_matches'))

@restrictRouter(allowed=["GET"])
def index(request):
    response = current_election()
    content = response.content.decode()

    context = json.loads(content)
    print(context)
    return render(request, 'api_index.html', context)

@csrf_exempt
@restrictRouter(allowed=["POST", "GET"])
def vote(request):
    if request.method == "POST":
        dict_post = dict(request.POST.items())

        dict_post['emailKey'] = 'ezhuang2@illinois.edu' # Hard code for now

        email_key = 'emailKey'
        id_key = 'id'
        if not validate_keys([email_key, id_key], dict_post):
            return HttpResponse(json.dumps({'message': 'Missing parameters'}),
                             content_type='application/json', status=400)
        response = cast_vote(dict_post[email_key], dict_post[id_key])

        return response
    elif request.method == "GET":
        response = get_all_votes()
        content = response.content.decode()

        context = {}
        context["votes"] = json.loads(content)
        print(context)
        return render(request, 'api_votes.html', context)