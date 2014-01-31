package urgame;

import dev.tilemap.TMXTiledMap;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.System;
import flambe.asset.AssetPack;
import flambe.asset.Manifest;
import flambe.display.FillSprite;
import flambe.display.ImageSprite;
import flambe.SpeedAdjuster;
import dev.display.SpriteSheetPlayer;

class Main
{
    private static function main ()
    {
        // Wind up all platform-specific stuff
        System.init();

        // Load up the compiled pack in the assets directory named "bootstrap"
        var manifest = Manifest.build("bootstrap");
        var loader = System.loadAssetPack(manifest);
        loader.get(onSuccess);
    }

    private static function onSuccess (pack :AssetPack)
    {
		GameLayer.GAME_HEIGHT = 900;
		GameLayer.GAME_WIDTH = 1539;
		
		Pack.pack = pack;
		var sprite = new Sprite();
	   System.root.add(sprite);
	   
	   
	   #if js
	   System.root.add(new SizeController());
	   #elseif flash
	   sprite.setScale(0.62);
	   Params.AUTO_SCALE = 0.62;
	   #end
		
		
		var e : Entity = new Entity();
		var s = new GameLayer();
		e.add(s);
	   System.root.addChild(e);   
    }
}
