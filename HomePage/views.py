from django.http import HttpResponse
from django.shortcuts import render
import time, datetime
from .models import Feedback
# Create your views here.
def index(request):
    return render(request, 'HomePage/index.html', None)

def getMsg(request):
    counts = Feedback.objects.count()
    name = request.POST.get('contactName', 'A guy has no name')
    email = request.POST.get('contactEmail', 'no email')
    subject = request.POST.get('contactSubject', 'no subject')
    message = request.POST.get('contactMessage', 'no message')
    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    msg = Feedback(counts + 1, name, email, subject, message, timestamp)
    msg.save()

    return HttpResponse('OK')