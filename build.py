from os import listdir
import hashlib
from shutil import rmtree
from os import makedirs

SOURCES = [
    'src/constants.js',
     'src/error.js',
    'src/algo.js',
    'src/parser.js',
    'src/main.js'   
]
def create_output():
    output = ''
    for e in SOURCES:
        with open(e, 'r') as f:
            output += f.read() + '\n'
    version = input('version: ')

    makedirs('versions', exist_ok=True)

    output_name = f'versions/AbsolutePosition_v{version}.js'

    with open(output_name, 'w') as f:
        f.write(output)
    return output_name


output_name = create_output()
#replacing html links 
link = f'https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/{output_name}'
div = f'src="{link}"'


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
