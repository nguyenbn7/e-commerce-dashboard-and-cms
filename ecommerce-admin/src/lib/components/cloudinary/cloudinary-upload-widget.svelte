<script lang="ts">
	import type {
		CloudinaryUploadEventAction,
		CloudinaryUploadEventCallback,
		CloudinaryUploadWidgetCloudinaryInstance,
		CloudinaryUploadWidgetProps,
		CloudinaryUploadWidgetWidgetInstance
	} from './cloudinary-upload-widget';
	import type {
		CloudinaryUploadWidgetError,
		CloudinaryUploadWidgetInstanceMethodCloseOptions,
		CloudinaryUploadWidgetInstanceMethodDestroyOptions,
		CloudinaryUploadWidgetInstanceMethodOpenOptions,
		CloudinaryUploadWidgetInstanceMethods,
		CloudinaryUploadWidgetResults,
		CloudinaryUploadWidgetSources
	} from '@cloudinary-util/types';
	import {
		generateSignatureCallback,
		generateUploadWidgetResultCallback,
		getUploadWidgetOptions,
		UPLOAD_WIDGET_EVENTS
	} from '@cloudinary-util/url-loader';
	import { getCloudinaryConfig } from './lib';
	import { PUBLIC_CLOUDINARY_UPLOAD_PRESET } from '$env/static/public';

	let {
		children,
		config,
		uploadPreset,
		signatureEndpoint,
		onOpen,
		options,
		onError,
		...props
	}: CloudinaryUploadWidgetProps = $props();

	let cloudinary: CloudinaryUploadWidgetCloudinaryInstance = $state();
	let widget: CloudinaryUploadWidgetWidgetInstance = $state();

	let error: CloudinaryUploadWidgetError | undefined = $state();
	let results: CloudinaryUploadWidgetResults | undefined = $state(undefined);
	let isScriptLoading = $state(true);

	function triggerOnIdle(callback: any) {
		if (window && 'requestIdleCallback' in window) {
			return requestIdleCallback(callback);
		}
		return setTimeout(() => callback(), 1);
	}

	function handleOnLoad() {
		isScriptLoading = false;

		if (!cloudinary) {
			cloudinary = (window as any).cloudinary;
		}

		// To help improve load time of the widget on first instance, use requestIdleCallback
		// to trigger widget creation. Optional.

		triggerOnIdle(() => {
			if (!widget) {
				widget = createWidget();
			}
		});
	}

	const uploadSignature =
		signatureEndpoint &&
		generateSignatureCallback({
			signatureEndpoint: String(signatureEndpoint),
			fetch
		});

	const cloudinaryConfig = getCloudinaryConfig(config);

	const uploadOptions = getUploadWidgetOptions(
		{
			uploadPreset: uploadPreset || PUBLIC_CLOUDINARY_UPLOAD_PRESET,
			uploadSignature,
			...options
		},
		cloudinaryConfig
	);

	const resultsCallback = generateUploadWidgetResultCallback({
		onError: (uploadError) => {
			error = uploadError;

			if (typeof onError === 'function') {
				onError(uploadError, {
					widget: widget.current,
					...instanceMethods
				});
			}
		},
		onResult: (uploadResult) => {
			if (typeof uploadResult?.event !== 'string') return;

			results = uploadResult;

			const widgetEvent = UPLOAD_WIDGET_EVENTS[uploadResult.event] as keyof typeof props;

			if (typeof widgetEvent === 'string' && typeof props[widgetEvent] === 'function') {
				const callback = props[widgetEvent] as CloudinaryUploadEventCallback;
				callback(uploadResult, {
					widget: widget.current,
					...instanceMethods
				});
			}

			const widgetEventAction = `${widgetEvent}Action` as keyof typeof props;

			if (widgetEventAction && typeof props[widgetEventAction] === 'function') {
				const action = props[widgetEventAction] as CloudinaryUploadEventAction;
				action(uploadResult);
			}
		}
	});

	/**
	 * createWidget
	 * @description Creates a new instance of the Cloudinary widget and stores in a ref
	 */

	function createWidget() {
		return cloudinary?.createUploadWidget(uploadOptions, resultsCallback);
	}

	/**
	 * Instance Methods
	 * Gives the ability to interface directly with the Upload Widget instance methods like open and close
	 * https://cloudinary.com/documentation/upload_widget_reference#instance_methods
	 */

	function invokeInstanceMethod<TMethod extends keyof CloudinaryUploadWidgetInstanceMethods>(
		method: TMethod,
		options: Parameters<CloudinaryUploadWidgetInstanceMethods[TMethod]> = [] as Parameters<
			CloudinaryUploadWidgetInstanceMethods[TMethod]
		>
	) {
		if (!widget) {
			widget = createWidget();
		}

		if (typeof widget?.[method] === 'function') {
			return widget[method](...options);
		}
	}

	function close(options?: CloudinaryUploadWidgetInstanceMethodCloseOptions) {
		invokeInstanceMethod('close', [options]);
	}

	function destroy(options?: CloudinaryUploadWidgetInstanceMethodDestroyOptions) {
		return invokeInstanceMethod('destroy', [options]);
	}

	function hide() {
		invokeInstanceMethod('hide');
	}

	function isDestroyed() {
		return invokeInstanceMethod('isDestroyed');
	}

	function isMinimized() {
		return invokeInstanceMethod('isMinimized');
	}

	function isShowing() {
		return invokeInstanceMethod('isShowing');
	}

	function minimize() {
		invokeInstanceMethod('minimize');
	}

	function open(
		widgetSource?: CloudinaryUploadWidgetSources,
		options?: CloudinaryUploadWidgetInstanceMethodOpenOptions
	) {
		invokeInstanceMethod('open', [widgetSource, options]);

		if (typeof onOpen === 'function') {
			onOpen(widget);
		}
	}

	function show() {
		invokeInstanceMethod('show');
	}

	function update() {
		invokeInstanceMethod('update');
	}

	const instanceMethods: CloudinaryUploadWidgetInstanceMethods = {
		close,
		destroy,
		hide,
		isDestroyed,
		isMinimized,
		isShowing,
		minimize,
		open,
		show,
		update
	};
</script>

<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/latest/global/all.js"
		type="text/javascript"
		id={`cloudinary-uploadwidget-${Math.floor(Math.random() * 100)}`}
		onload={handleOnLoad}
		async
		onerror={(e) => console.error(`Failed to load Cloudinary Upload Widget`)}
	></script>
</svelte:head>

{@render children?.({
	cloudinary,
	widget,
	results,
	error,
	isLoading: isScriptLoading,
	...instanceMethods
})}
