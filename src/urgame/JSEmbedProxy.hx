package com.nick;

/**
 * ...
 * @author Ang Li
 */
import flambe.System;

class JSEmbedProxy
{

	public function new() 
	{
		// Nothing
	} 
	
	static public function alertOn( inString ) 
	{		
		callJSEmbedMethod("addAlert('"+inString+"', '')");
	}
	
	static public function alertOff() 
	{
		callJSEmbedMethod("removeAlert('')");
	}
	
	static public var exists( get_exists, never) : Bool;
	static public function get_exists() : Bool
	{
		return callJSEmbedMethod("exists()");
	}
	
	static public var parameters(get_parameters, never) : String;
	static public function get_parameters() : String
	{
		return callJSEmbedMethod("params()");
	}
	
	static public var attributes(get_attributes, never) : String;
	static public function get_attributes() : String
	{
		return callJSEmbedMethod("attr()");
	}
	
	static public var base(get_base, never) : String;
	static public function get_base() : String
	{
		return callJSEmbedMethod("baseUrl()");
	}
	
	static public var canvasScale(get_canvasScale, never) : Float;
	static public function get_canvasScale() : Float
	{
		return Std.parseFloat(callJSEmbedMethod("canvasScale()"));
	}
	
	static public var canvasWidth(get_canvasWidth, never) : Float;
	static public function get_canvasWidth() : Float
	{
		return Std.parseFloat(callJSEmbedMethod("canvasWidth()"));
	}
	
	static public var canvasHeight(get_canvasHeight, never) : Float;
	static public function get_canvasHeight() : Float
	{
		return Std.parseFloat(callJSEmbedMethod("canvasHeight()"));
	}
	
	static public var isPaused(get_isPaused, never) : Bool;
	static public function get_isPaused() : Bool
	{
		return callJSEmbedMethod("isPaused()");
	}
	
	static public function pause() 
	{
		callJSEmbedMethod("pause()");
	}
	
	static public function unpause()
	{
		callJSEmbedMethod("unpause()");
	}
	
	static public function setScale( inScale ) 
	{
		callJSEmbedMethod("setScale("+Std.string(inScale)+")");
	}
	
	static public function setDimensions( inWidth, inHeight )
	{
		callJSEmbedMethod("setScale("+Std.string(inWidth)+","+Std.string(inHeight)+")");
	}
	
	static public function callJSEmbedMethod( pRequest:String ) : Dynamic
	{
		// Make sure you include () parenthesis and any parameters needed by the method.
		#if js	
			try
			{						
				var result = (js.Lib.eval("jsembed."+pRequest));
				return result==null?"":result;						
			} catch( err:Dynamic )
			{
				// Nothing
				//trace("[JSEmbedProxy](callJSEmbedMethod) Error: JSEmbed missing, or can't handle request : " + ("jsembed."+pRequest));
			}
		#elseif flash
			// Warning: Largely untested. JSEmbed doesn't embed flash, so this is present only for edge cases.
			try
			{				
				var result = (System.external.call("eval",["jsembed."+pRequest]));
				return result==null?"":result;			
			} catch( err:Dynamic)
			{
				// Nothing
			}
		#end 
		
		return "";
		
	}
	
} 