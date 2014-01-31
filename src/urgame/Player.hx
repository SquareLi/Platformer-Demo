package urgame;
import box2D.collision.shapes.B2CircleShape;
import box2D.collision.shapes.B2PolygonShape;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2BodyDef;
import box2D.dynamics.B2FixtureDef;
import dev.display.SpriteFrame;
import dev.display.SpriteSheet;
import dev.display.SpriteSheetPlayer;
import dev.tilemap.TMXObject;
import dev.tilemap.TMXSprite;
import flambe.Component;
import flambe.display.ImageSprite;
import flambe.Entity;
import flambe.math.Point;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import dev.math.Rectangle;
import dev.tilemap.TMXTiledMap;
import flambe.System;
import flambe.display.Sprite;
/**
 * ...
 * @author Ang Li(李昂)
 */
class Player extends Component
{	
	var walkPlayer : SpriteSheetPlayer;
	var jumpPlayer : SpriteSheetPlayer;
	var controlSprite : Sprite;
	var entity : Entity;
	var body : B2Body;
	public var position : Point;
	public var status : Status;
	var width : Float = 90;
	var height : Float = 100;
	
	var speedX : Float = 0;
	var speedY : Float = 0;
	public var dir : Direction;
	public function new(gameLayer : GameLayer) 
	{
		walkPlayer = new SpriteSheetPlayer(Pack.pack, "sprite/base.plist");
		jumpPlayer = new SpriteSheetPlayer(Pack.pack, "sprite/jump.plist");
		status = Status.Idle;
		dir = Direction.Right;
		
		var map : TMXTiledMap = gameLayer.map;
		var object : TMXObject = map.getObjectGroup("Player").getObjects()[0];
		position = new Point(object.x, object.y);
		
		var bodyDef : B2BodyDef = new B2BodyDef();
		var fixtureDef : B2FixtureDef = new B2FixtureDef();
		var shape : B2PolygonShape = new B2PolygonShape();
		//var shape : B2CircleShape = new B2CircleShape();
		//
		bodyDef.type = B2Body.b2_dynamicBody;
		bodyDef.position.set((position.x - width / 2 - 10)/ GameLayer.PTM, (position.y - height / 2)/ GameLayer.PTM);
		body = GameLayer.world.createBody(bodyDef);
		body.setSleepingAllowed(false);
		body.setFixedRotation(true);
		
		
		shape.setAsBox(width / 2 / GameLayer.PTM - 0.7, height / 2 / GameLayer.PTM);
		//shape.setRadius(height / 2 / GameLayer.PTM - 1);
		fixtureDef.shape = shape;
		fixtureDef.density = 1;
		
		body.createFixture(fixtureDef);
		body.name = "player";
		body.setUserData(this);
		
	}


	
	override public function onAdded()
	{
		entity = new Entity();
		
		controlSprite = new Sprite();
		
		entity.add(controlSprite);
		controlSprite.y._ = position.y;
		controlSprite.x._ = position.x;
		//s.setScale(2);
		owner.addChild(entity);
		entity.add(walkPlayer);
		walkPlayer.loop();
		walkPlayer.setSpeed(50);
		
		//trace(contro
		
	}
	
	override public function onUpdate(dt:Float)
	{
		if (status == Status.Walk) {
			speedY = body.getLinearVelocity().y;
		} else {
			speedY = body.getLinearVelocity().y;
		}
		
		//switch(dir) {
			//case Direction.Left :
				//controlSprite.scaleX._ = -1;
			//case Direction.Right :
				//controlSprite.scaleX._ = 1;
		//}
		
		if (status == Status.Jump) {
			//trace(speedY);
		}
		
		body.setLinearVelocity(new B2Vec2(speedX, speedY));
		controlSprite.x._ = body.getPosition().x * GameLayer.PTM - width / 2;
		controlSprite.y._ = body.getPosition().y * GameLayer.PTM - height / 2 - 16;
		//trace(body.getPosition().x + ", " + body.getPosition().y);
		
		position.x = controlSprite.x._;
		position.y = controlSprite.y._;
	}
	
	override public function onRemoved()
	{
		
	}
	
	public function walk() {
		if (status == Status.Walk) {
			return;
		}
		
		if (status == Status.Jump) {
			if (dir == Direction.Left) {
				speedX = -10;
			} else {
				speedX = 10;
			}
			return;
		}
		entity.add(walkPlayer);
		walkPlayer.loop();
		walkPlayer.setSpeed(50);
		status = Status.Walk;
		if (dir == Direction.Left) {
			speedX = -10;
		} else {
			speedX = 10;
		}
	}
	
	public function jump() {
		if (status == Status.Jump) {
			return;
		}
		status = Status.Jump;
		entity.add(jumpPlayer);
		jumpPlayer.play();
		jumpPlayer.setSpeed(50);
		body.applyImpulse(new B2Vec2(0, -60), body.getWorldCenter());
	}
	
	public function stop() {
		speedX = 0;
		
		if (status == Status.Jump) {
			return;
		}
		status = Status.Idle;
		
	}
}