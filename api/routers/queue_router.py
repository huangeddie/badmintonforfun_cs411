from api.calls.queue_call import get_next_on_queue, get_queues as call_get_queues
from api.routers.router import restrictRouter, validate_keys


@restrictRouter(allowed=["GET"])
def get_queues(request):
    """
    GET -- Gets the active queues
    :param request:
    :return:
    """
    return call_get_queues()


@restrictRouter(allowed=["GET"])
def next_on_queue(request):
    """
    GET -- The next party on the specified queue to play
    :param request:
    :return:
    """
    if request.method == "GET":
        dict_get = dict(request.GET.items())
        validate_keys('queue_type', dict_get)
        return get_next_on_queue(dict_get['queue_type'])