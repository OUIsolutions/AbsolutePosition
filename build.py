from os import listdir
import hashlib
from shutil import rmtree
from os import makedirs
elements = [
    'src/constants.js',
     'src/error.js',
    'src/algo.js',
    'src/parser.js',
    'src/main.js'   
]
output = ''
for e in elements:
    with open(e, 'r') as f:
        output += f.read() + '\n'
sha = hashlib.sha256()
output_name = sha.hexdigest()

with open(f'AbsolutePosition{output_name}.js', 'w') as f:
    f.write(output)


#generate the sha for output 


#replacing html links 
link = 'https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@latest/AbsolutePosition.js'
div = f'src="{link}?v={sha.hexdigest()}"'

rmtree('internal/exemples',ignore_errors=True)
makedirs('internal/exemples')

for e in listdir('internal/exemples_not_linked'):
    with open(f'internal/exemples_not_linked/{e}', 'r') as f:
        output = f.read()
        output = output.replace('#lib#', div)
        with open(f'internal/exemples/{e}', 'w') as f:
            f.write(output)



exemples = listdir('internal/exemples')

with open('internal/readme.md', 'r') as f:
    readme_code = f.read()

for e in exemples:
    with open(f'internal/exemples/{e}', 'r') as f:
        output = f.read()
        readme_code = readme_code.replace(f"#ref:{e}", f'```html\n{output}\n```')

if "#ref" in readme_code:
    raise Exception(f"Missing reference {readme_code.split('#ref')[1]}")
with open('readme.md', 'w') as f:
    f.write(readme_code)


   