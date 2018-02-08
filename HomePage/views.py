from django.http import HttpResponse
from django.shortcuts import render
import time, datetime, re
from .models import Feedback, Subscription

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

def getMail(request):
    counts = Subscription.objects.count()
    try:
        email = request.POST['EMAIL']
        if re.match(r"^[-\w\.]+@([\w-]+\.)+[\w-]{2,4}$", email):
            mail = Subscription(counts + 1, email)
            mail.save()
            return HttpResponse('success')
        else:
            return HttpResponse('failed')
    except:
        return HttpResponse('failed')


def chat(request):
    return render(request, 'HomePage/chatbox-5.html', None)
    # return render(request, 'HomePage/chat.html', None)

def msgForm(request):

    params = {"minbudget": -1, "brand": -1, "model": -1, "dualsim": -1, "4g": -1, "3g": -1, "display": -1,
              "rearcamera": -1,
              "frontcamera": -1, "cpu": -1, "chipset": -1, "ram": -1, "internal": -1, "fingerprint": -1, "os": -1,
              "battery": -1}
    params = request.session.get("params", params)
    handlereply = request.session.get("handlereply", 0)
    replymsg = request.session.get("replymsg", [])

    # import pdb;    pdb.set_trace()

    # reply, handlereply = solve(request.POST.get('usermsg'), params, handlereply, replymsg)

    # import pdb; pdb.set_trace()

    request.session['params'] = params
    request.session['handlereply'] = handlereply
    request.session['replymsg'] = replymsg
    request.session.modified = True

    return HttpResponse(reply)

# chat bot
# import nltk
# from itertools import chain
# from nltk.corpus import wordnet
# import re
# import sqlite3
# from sqlite3 import Error


# def num(s):
#     s = str(s)
#     s = re.sub(r"^.*?([0-9][0-9.]*).*$", r"\1", s)
#     try:
#         return int(s)
#     except ValueError:
#         return float(s)


# def retQuerystr(param):
#     # print(param)
#     ret = "SELECT * FROM specifications WHERE";
#     conj = []
#     if param['chipset'] != -1: conj.append(" INSTR(LOWER(chipset), LOWER('" + param['chipset'] + "')) > 0")
#     if param['brand'] != -1: conj.append(" INSTR(LOWER(brand), LOWER('" + param['brand'] + "')) > 0")
#     if param['os'] != -1: conj.append(" INSTR(LOWER(os), LOWER('" + param['os'] + "')) > 0")

#     if param['4g'] != -1: conj.append(" _4g == " + str(param['4g']))
#     if param['3g'] != -1: conj.append(" _3g == " + str(param['3g']))
#     if param['fingerprint'] != -1: conj.append(" fingerprint == " + str(param['fingerprint']))
#     if param['dualsim'] != -1: conj.append(" dualsim == " + str(param['dualsim']))

#     if param['minbudget'] != -1: conj.append(" minbudget <= " + str(num(param['minbudget'])))
#     if param['internal'] != -1: conj.append(" internal >= " + str(num(param['internal'])))
#     if param['display'] != -1: conj.append(" display >= " + str(num(param['display'])))
#     if param['ram'] != -1: conj.append(" ram >= " + str(num(param['ram'])))
#     if param['rearcamera'] != -1: conj.append(" rearcamera >= " + str(num(param['rearcamera'])))
#     if param['frontcamera'] != -1: conj.append(" frontcamera >= " + str(num(param['frontcamera'])))
#     if param['battery'] != -1: conj.append(" battery >= " + str(num(param['battery'])))

#     if param['model'] != -1: conj.append(" INSTR(LOWER(model), LOWER('" + param['model'] + "')) > 0")
#     # print(conj)
#     ret = ret + " and".join(conj) + " ORDER BY AvgCompoundScore DESC;"
#     return ret


# def getsynset(orig):
#     syns = wordnet.synsets(orig)
#     return set(chain.from_iterable([word.lemma_names() for word in syns]))


# def create_connection(db_file):
#     try:
#         conn = sqlite3.connect(db_file)
#         return conn
#     except Error as e:
#         print(e)
#         return None


# def categorize(inp):
#     relwords = []
#     wordlist = nltk.word_tokenize(inp)
#     tags = nltk.pos_tag(wordlist)
#     pos = {"adj": [], "adv": [], "noun": [], "verb": [], "num": [], "prep": [], "what": []}
#     for word, tag in tags:
#         if "JJ" in tag:
#             pos["adj"].append(word); relwords.append(word)
#         elif "RB" in tag:
#             pos["adv"].append(word); relwords.append(word)
#         elif "NN" in tag:
#             pos["noun"].append(word); relwords.append(word)
#         elif "VB" in tag:
#             pos["verb"].append(word); relwords.append(word)
#         elif "IN" in tag:
#             pos["prep"].append(word); relwords.append(word)
#         elif "CD" in tag:
#             pos["num"].append(word); relwords.append(word)
#         elif "W" in tag:
#             pos["what"].append(word); relwords.append(word)
#     return pos, relwords


# def solve(inp, params, handlereply, replymsg):

#     frontcamflag = 0
#     rearcamflag = 2
#     replydict = {
#         1: "No records found for your query\nDo you want to update/remove any preferences ? (u/r):",
#         2: "Enter the preferences that you want to update",
#         3: "Enter the preferences that you want to remove",
#         5: "What internal memory would be good for you ? 32gb(yes/no)",
#         6: "How much ram would be good for you ? 3gb(yes/no)",
#         7: "Any specific model you want to search in the brand?"
#     }

#     inp = inp.lower()

#     inp = re.sub(r"(\d)k", "\g<1>000", inp)
#     inp = re.sub(r"(\d) gb", "\g<1>gb", inp)
#     inp = re.sub(r"(\d) inch", "\g<1>inch", inp)
#     inp = re.sub(r"(\d) cm", "\g<1>cm", inp)
#     inp = re.sub(r"(\d) mp", "\g<1>mp", inp)
#     inp = re.sub(r"(?i)(\d) mah", "\g<1>mah", inp)

#     pos, relwords = categorize(inp)
#     if "hi" in inp or "hello" in inp or "morning" in inp:
#         return "hello!", handlereply

#     for numm in pos['num']:
#         if "mah" in numm:
#             params['battery'] = numm
#     if "battery" in inp and params['battery'] == -1:
#         params['battery'] = '3000'

#     if len(pos["what"]) > 0 and "interest" in inp:
#         return "I'm interested in suggesting you mobile phones", handlereply
#     if len(pos["what"]) > 0 and "name" in inp:
#         return "I am Tweety, how can I help you?", handlereply

#     # internal and ram
#     mem = re.sub(r"^.*?(\d+)gb.{,10}ram.*$", r"\1", inp)
#     # print(mem, inp)
#     if mem == inp:
#         mem = re.sub(r"^.*?(\d+)gb.*$", r"\1", inp)
#         if mem == inp:
#             pass
#         else:
#             try:
#                 mem = int(mem)
#                 params['internal'] = mem

#             except:
#                 pass
#     else:
#         try:
#             mem = int(mem)
#             params['ram'] = mem

#         except:
#             pass

#     if handlereply == 1:
#         if inp == 'u':
#             handlereply = 2
#             return replydict[handlereply], handlereply
#         elif inp == 'r':
#             handlereply = 3
#             return replydict[handlereply], handlereply
#         else:
#             handlereply = 0
#             return "Okay, Im assuming you don't need any modifications!", handlereply
#     elif handlereply == 3:
#         brands = ["redmi", "samsung", "huawei", "lenovo", "coolpad", "oppo", "motorola", "moto", "xiaomi", "vivo",
#                   "gionee", "asus", "micromax", "apple", "oneplus"]
#         if "brand" in inp:
#             params['brand'] = -1
#         if "model" in inp:
#             params['model'] = -1
#         if "dualsim" in inp or "dual sim" in inp:
#             params['dualsim'] = -1
#         if "4g" in inp: params['4g'] = -1
#         if "3g" in inp: params['3g'] = -1
#         if "ram" in inp: params['ram'] = -1
#         if "internal" in inp: params['internal'] = -1
#         if "camera" in inp: params['frontcamera'] = params['rearcamera'] = -1

#         handlereply = 0
#         return "Parameters updated.", handlereply
#     elif handlereply == 4:
#         pass
#     elif handlereply == 5:
#         if "yes" in inp or "yo" in inp or "yeah" in inp or "sure" in inp or "fine" in inp or "good" in inp or "okay" in inp:
#             params['internal'] = 32
#         else:
#             params['internal'] = -1
#         handlereply = 0
#     elif handlereply == 6:
#         if "yes" in inp or "yo" in inp or "yeah" in inp or "sure" in inp or "fine" in inp or "good" in inp or "okay" in inp:
#             params['ram'] = 3
#         else:
#             params['ram'] = -1
#         handlereply = 0
#     elif handlereply == 7:
#         # print(inp)
#         if "no" in inp or "naah" in inp or "nope" in inp or "dont" in inp or "don't" in inp or "good" in inp or "not" in inp:

#             params['model'] = -1
#         else:
#             params['model'] = inp
#         handlereply = 0
#         frontcamflag = 0
#         rearcamflag = 2

#     if "iphone" in inp: relwords.append('apple')

#     for word in relwords:

#         price = getsynset("price").union(getsynset("cost").union(getsynset("rate")))
#         if word in price or "between" in word:

#             # see if price is enquired
#             # if len(pos['what']) > 0:
#             #     replyprice = True

#             # budget
#             if len(pos['num']) > 0:
#                 params['minbudget'] = max(pos['num'])

#         chipsets = ["qualcomm", "snapdragon", "intel", "atom", "core m", "corem", "nvidia", "tegra", "mediatek",
#                     "helio", "heliox", "hisilicon", "kirin", "exynos"]
#         if word in chipsets:
#             params['chipset'] = word

#         brands = ["redmi", "samsung", "huawei", "lenovo", "coolpad", "oppo", "motorola", "moto", "xiaomi", "vivo",
#                   "gionee", "asus", "micromax", "apple", "oneplus", "iphone"]
#         if word in brands:
#             replymsg.append(7)
#             params['brand'] = word

#         if "dualsim" in inp or "dual sim" in inp: params['dualsim'] = 1
#         if "3g" == word: params['3g'] = 1;
#         if "4g" == word or "lte" == word or "volte" == word: params['4g'] = 1;
#         if "fingerprint" in word: params['fingerprint'] = 1;

#         internal = ["storage", "capacity", "internal", "rom"]
#         if params['internal'] == -1 and word in internal:
#             replymsg.append(5)

#         ram = ["gb", "memory", "ram"]
#         if params['ram'] == -1 and word in ram:
#             replymsg.append(6)

#         # display
#         disp = ["display", "disp", "screen", "area", "inch", "cm", "inches", "cm2", "cm square"]
#         if "cm" in word or "inch" in word:
#             params['display'] = word

#         elif word in disp and params['display'] is int:
#             params['display'] = 1

#         # camera
#         if "front" in word or "secondary" in word or "selfie" in word:
#             frontcamflag = 1
#             if rearcamflag == 2: rearcamflag = 0
#         if "rear" in word or "back" in word or "primary" in word:
#             rearcamflag = 1

#         # cam = ["image", "picture", "photo", "camera", "pic", "megapixel", "mp", "mega-pixel", "pixel", "selfie"]
#         if "mp" in word or "pixel" in word:
#             if frontcamflag: params['frontcamera'] = word;
#             if rearcamflag: params['rearcamera'] = word;

#         os = ["ios", "android", "marshmallow", "lollipop", "kitkat", "nougat", "oreo", "windows"]
#         if word in os:
#             params['os'] = word

#     # print(params)

#     totalparams_set = 0
#     for it in params.values():
#         if it != -1: totalparams_set += 1

#     if "phone" in inp and params['minbudget'] == -1 and totalparams_set == 0:
#         params['minbudget'] = "20000"

#     if len(replymsg) > 0:
#         handlereply = replymsg[0]
#         replymsg.remove(replymsg[0])
#         return replydict[handlereply], handlereply

#     elif totalparams_set:
#         q = retQuerystr(params)
#         valuereturn = 0
#         ret = []

#         conn = create_connection("database.db")
#         cur = conn.cursor()

#         # import pdb; pdb.set_trace()

#         for row in cur.execute(q):
#             ret.append(row)
#             valuereturn += 1
#             if valuereturn >= 10: break

#         conn.close()

#         if len(ret) > 0:
#             return ret, handlereply

#         if valuereturn:
#             replymsg.append(1)
#     else:
#         return "Sorry I don't understand, please mention your specifications", handlereply