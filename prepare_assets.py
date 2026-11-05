from pathlib import Path
from PIL import Image, ImageChops
from shutil import move
root=Path(__file__).resolve().parent
assets=root/'assets'
originals=assets/'originales'
optimized=assets/'ilustraciones'
originals.mkdir(exist_ok=True)
optimized.mkdir(exist_ok=True)
mapping={
  'TREN PARTE 1.png':'tren-01.png','TREN PARTE 2.png':'tren-02.png',
  'TREN PARTE 3.png':'tren-03.png','TREN PARTE 4.png':'tren-04.png',
  'árbol navideño.png':'arbol.png','papa noel.png':'santa.png',
  'reno.png':'reno.png','trineo.png':'trineo.png','Frosty.png':'frosty.png',
  'Farol Navideño.png':'farol.png','arbusto navideño.png':'arbusto.png'
}
for source,target in mapping.items():
 src=assets/source
 if src.exists(): move(src, originals/source)
 src=originals/source
 im=Image.open(src).convert('RGBA')
 alpha=im.getchannel('A')
 bbox=alpha.point(lambda a: 255 if a>4 else 0).getbbox()
 if bbox is None: raise Exception(f'Empty {src}')
 margin=12 if source.startswith('TREN') else 20
 l,t,r,b=bbox
 crop=im.crop((max(0,l-margin),max(0,t-margin),min(im.width,r+margin),min(im.height,b+margin)))
 crop.save(optimized/target,optimize=True,compress_level=8)
 print(src.name,im.size,'=>',crop.size,target)
