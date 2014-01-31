package box2D.dynamics;
import box2D.common.math.B2Vec2;
import flambe.display.ImageSprite;

/**
 * ...
 * @author Ang Li(李昂)
 */
class B2Image
{

	public function new() 
	{
		corners = new Array<B2Vec2>();
		glTexCoordPointer = new Array<Float>();
		glVertexPointer = new Array<Float>();
		center = new B2Vec2();
	}
	
	public var body : B2Body;
	public var center : B2Vec2;
	public var angle : Float;
	public var corners : Array<B2Vec2>;
	public var glTexCoordPointer : Array<Float>;
	public var glVertexPointer : Array<Float>;
	public var name : String;
	public var opacity : Float;
	public var renderOrder : Int;
	public var scale : Float;
	public var src : String;
	public var image : ImageSprite;
	
}