from core import CH
OP=set('+−×:=<>➜→-')
def hasop(p):return any(x[0].strip()[:1] in OP for x in p)
def join(parts,mode):
    out=[]
    for i,x in enumerate(parts):
        if i:
            if mode=='eq':o='='
            elif mode=='sum':o='+' if i<len(parts)-1 else '='
            elif mode=='lt':o='<'
            elif mode=='last':o='=' if i==len(parts)-1 else None
            if o:out.append([o,'',2])
        out.append(x)
    return out
# Modus je Thema: {Blockindex: modus}; Blöcke mit Chips werden umgebaut
M={
'kl2-mathe-hunderterfeld':{2:'eq',4:'sum',5:'sum',6:'sum',7:'sum'},
'kl2-mathe-zahlenstrahl':{5:'eq'},
'kl2-mathe-nachbarzahlen':{4:'lt',5:'lt',6:'lt',7:'lt'},
'kl2-mathe-plus100':{4:'eq',5:'eq',6:'last',7:'last',8:'last'},
'kl2-mathe-minus100':{4:'eq',5:'eq',6:'last',7:'last',8:'last'},
'kl2-mathe-mal-2-5-10':{8:'eq'},
'kl2-mathe-meter-cm':{4:'eq',5:'eq'},
'kl2-mathe-uhr-halb-viertel':{2:'eq',3:'eq',4:'eq',5:'eq'},
'kl3-mathe-zahlen1000':{2:'eq',3:'eq',4:'eq',5:'sum',6:'sum',10:'lt'},
'kl3-mathe-plus1000':{4:'eq',5:'eq',6:'eq',7:'last',8:'last',9:'last'},
'kl3-mathe-minus1000':{4:'eq',5:'eq',6:'eq',7:'last',8:'last',9:'last'},
'kl3-mathe-division-10er':{4:'eq'},
'kl4-mathe-liter-dl':{3:'eq',4:'eq'},
'kl4-mathe-zentiliter':{2:'eq',3:'eq',4:'eq',5:'eq'},
'kl5-mathe-tonnen':{3:'eq',4:'eq'},
'kl5-mathe-flaeche':{2:'eq',5:'eq',6:'eq',7:'eq'},
'kl5-mathe-volumen':{2:'eq',7:'eq'},
'kl6-mathe-bruch-dezimal':{2:'eq',3:'eq',4:'eq',5:'eq',6:'eq',7:'eq'},
'kl6-mathe-bruch-dezimal-prozent':{0:'eq',2:'eq',3:'eq',4:'eq',5:'eq',6:'eq'},
}
def apply(tid,blocks):
    for i,m in M.get(tid,{}).items():
        for v in blocks[i]['visuals']:
            if v['type']=='chips':v['parts']=join(v['parts'],m)
