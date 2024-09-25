import sys
import time
import os
import subprocess
from collections import OrderedDict
file = sys.argv[1]
os.path.abspath('.')
os.chdir('/mnt/c/Users/nicol/Desktop/hackutd/backend/src/api/compiler/')
commands = ('buyif', 'sellif', 'wait', 'buy', 'sell', 'loop', 'kill')
file2 = open('ScriptBaseStart.txt', 'r')
file3 = open('ScriptBaseEnd.txt', 'r')
script_f = file2.read()
script_f1 = file3.read()


# more to be added
def check(myStr):
    open_list = ["{"]
    close_list = ["}"]
    stack = []
    for i in myStr:
        if i in open_list:
            stack.append(i)
        elif i in close_list:
            pos = close_list.index(i)
            if ((len(stack) > 0) and
                    (open_list[pos] == stack[len(stack) - 1])):
                stack.pop()
            else:
                return False
    if len(stack) == 0:
        return True
    else:
        return False


def find_parens(s):
    toret = OrderedDict()
    pstack = []

    for i, c in enumerate(s):
        if c == '{':
            pstack.append(i)
        elif c == '}':
            if len(pstack) == 0:
                raise IndexError("No matching closing parens at: " + str(i))
            toret[pstack.pop()] = i

    if len(pstack) > 0:
        raise IndexError("No matching opening parens at: " + str(pstack.pop()))
    temp = sorted(list(toret.items()), key=lambda x: x[0])

    return temp


def get_loop_len(file_str):
    loops = []
    loop_pos = find_parens(file_str)
    for key in loop_pos:
        str = file_str[key[0] + 1:key[1]]
        loops.append(len(str.split('\n')) - 2)
    return loops


def prepend(list, str, start, loop_len):
    for x in range(start, start + loop_len):
        list[x] = "\t" + list[x]


def parse(user_script):
    res = []
    loop_starts = []
    file_str = user_script
    if not check(file_str):
        print("Check balance")
    lengths = get_loop_len(file_str)
    line_num = 1
    for line in file_str.split('\n'):
        token = line.strip().split(" ")[0]
        if token == 'loop':
            res.append("while True:")
            loop_starts.append(line_num)
        elif token == 'buy':
            res.append("buy(\"" + line.strip() + "\")")
        elif token == 'buyif':
            res.append("buyif(\"" + line.strip() + "\")")
        elif token == 'sell':
            res.append("sell(\"" + line.strip() + "\")")
        elif token == 'sellif':
            res.append("sellif(\"" + line.strip() + "\")")
        elif token == 'wait':
            res.append("wait(\"" + line.strip() + "\")")
        elif token == 'kill':
            res.append("kill(\"" + line.strip() + "\")")
        elif token == '}':
            res.append("\n")
        else:
            res.append("ERROR")
        line_num += 1
    for x in range(0, len(lengths)):
        prepend(res, "\t", loop_starts[x], lengths[x])
    return res

script_code = parse(file)
directory = 'script.py'
script = open(directory, 'w')
for line in script_f:
    script.write(line)
script.write("\n")
for line in script_code:
    script.write(line + '\n')
for line in script_f1:
    script.write(line)
script.write('\n')
script.close()
subprocess.run(["python3", "script.py"])

