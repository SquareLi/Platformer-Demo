package urgame;
import flambe.Component;
import flambe.display.Sprite;

/**
 * ...
 * @author Ang Li(李昂)
 */
class SizeController extends Component
{

	var _document : Dynamic;
	var _scaleSprite : Sprite;

	public function new() 
	{
		_document = { canvasScale:1};
		Params.AUTO_SCALE = _document.canvanScale;
	}
	
	override public function onAdded() 
	{
		_scaleSprite = owner.get(Sprite);
		#if js
		_document = js.Lib.eval("document");
		#end
	}
	
	override public function onUpdate(dt:Float) 
	{
		Params.AUTO_SCALE = _document.canvasScale;
		
		if ( (_document.canvasScale != null)&& Params.AUTO_SCALE != _scaleSprite.scaleX._ )
		{
			
			_scaleSprite.scaleX._ = Params.AUTO_SCALE;
			_scaleSprite.scaleY._ = _scaleSprite.scaleX._;
		}
	}
	
}