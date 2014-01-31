package urgame;
import box2D.collision.shapes.B2PolygonShape;
import box2D.dynamics.B2Body;
import dev.tilemap.TMXObject;
import flambe.Component;
import box2D.dynamics.B2BodyDef;
import box2D.dynamics.B2FixtureDef;
import flambe.display.ImageSprite;
import flambe.Entity;

/**
 * ...
 * @author ...
 */
class Crate extends Component
{
	var body : B2Body;
	var sprite : ImageSprite;
	
	public function new(o : TMXObject) 
	{
		sprite = new ImageSprite(Pack.pack.getTexture("test/box"));
		sprite.setXY(o.x + 16, o.y + 16);
		sprite.centerAnchor();
		
		var bodyDef : B2BodyDef = new B2BodyDef();
		bodyDef.type = B2Body.b2_dynamicBody;
		bodyDef.position.set((o.x + o.width / 2) / GameLayer.PTM, (o.y + o.height / 2)/ GameLayer.PTM);
		
		body = GameLayer.world.createBody(bodyDef);
		body.name = "crateground";
		var shape : B2PolygonShape  = new B2PolygonShape();
		shape.setAsBox(o.width / GameLayer.PTM, o.height / GameLayer.PTM);
		
		var fixtureDef : B2FixtureDef = new B2FixtureDef();
		fixtureDef.shape = shape;
		fixtureDef.density = 1;
		body.createFixture(fixtureDef);
		
		body.setUserData(this);
	}
	
	override public function onAdded() 
	{
		owner.add(sprite);
	}
	
	override public function onRemoved() 
	{
		owner.dispose();
		GameLayer.world.destroyBody(body);
	}
	
	override public function onUpdate(dt:Float) 
	{
		sprite.x._ = body.getPosition().x * GameLayer.PTM;
		sprite.y._ = body.getPosition().y * GameLayer.PTM;
		
		sprite.rotation._ = body.getAngle() * (180 / Math.PI);
	}
}