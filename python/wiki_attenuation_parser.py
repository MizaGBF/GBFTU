import pyperclip
import json

# To parse https://gbf.wiki/User:Cajunwildcat/Skill_Attenuation/edit
with open("content.txt", mode="r", encoding="utf-8") as f:
    entries = f.read().replace("\n", "").replace("\r", "").split("{{../Skill Attentuation/Template")

def delimit(entry):
    lvl = 0
    for i in range(len(entry)):
        match entry[i]:
            case "{":
                if i < len(entry) - 1 and entry[i + 1] == "{":
                    lvl += 1
            case "}":
                if i < len(entry) - 1 and entry[i + 1] == "}":
                    if lvl == 0:
                        return entry[1:i]
                    else:
                        lvl -= 1
    return ""

def extract(entry):
    params = entry.split("|")
    skill = {"id":None, "threshold":None, "dampening":None}
    for p in params:
        if p.startswith("id="):
            skill["id"] = p[len("id="):]
        elif p.startswith("breakpoints="):
            skill["threshold"] = p[len("breakpoints="):].replace(",", "").split(";")
        elif p.startswith("attenuations="):
            skill["dampening"] = p[len("attenuations="):].replace(",", "").split(";")
    return skill

skills = {}
for i in range(len(entries)):
    entries[i] = delimit(entries[i])
    if entries[i] != "":
        skill = extract(entries[i])
        if None in skill.values():
            pass
        else:
            sid = "Skill " + skill["id"]
            skills[sid] = [[0, 1]]
            for j, t in enumerate(skill["threshold"]):
                skills[sid].append([
                    int(t), int(skill["dampening"][j]) / 100.0
                ])

txt = ""
for k, v in skills.items():
    txt += '\t\t"' + k + '": [\n'
    for e in v:
        txt += '\t\t\t' + json.dumps(e) + ',\n'
    txt = txt[:-2] + '\n\t\t],\n'
txt = txt[:-2]

pyperclip.copy(txt)
print("Copied!")

