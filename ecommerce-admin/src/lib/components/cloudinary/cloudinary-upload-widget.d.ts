import type { Snippet } from 'svelte';
import type {
	CloudinaryUploadWidgetOptions,
	CloudinaryUploadWidgetResults,
	CloudinaryUploadWidgetInstanceMethods,
	CloudinaryUploadWidgetError
} from '@cloudinary-util/types';
import type { ConfigOptions } from '@cloudinary-util/url-loader';

export type CloudinaryUploadWidgetCloudinaryInstance = any;
export type CloudinaryUploadWidgetWidgetInstance = any;

export interface CloudinaryUploadWidgetProps {
	children?: Snippet<[CloudinaryUploadWidgetPropsChildren]>;
	config?: ConfigOptions;
	onError?: CloudinaryUploadEventCallbackError;
	onOpen?: CloudinaryUploadEventCallbackWidgetOnly;
	/**
	 * @deprecated use onSuccess instead
	 */
	onUpload?: CloudinaryUploadEventCallbackNoOptions;
	onAbort?: CloudinaryUploadEventCallback;
	onBatchCancelled?: CloudinaryUploadEventCallback;
	onClose?: CloudinaryUploadEventCallback;
	onDisplayChanged?: CloudinaryUploadEventCallback;
	onPublicId?: CloudinaryUploadEventCallback;
	onQueuesEnd?: CloudinaryUploadEventCallback;
	onQueuesStart?: CloudinaryUploadEventCallback;
	onRetry?: CloudinaryUploadEventCallback;
	onShowCompleted?: CloudinaryUploadEventCallback;
	onSourceChanged?: CloudinaryUploadEventCallback;
	onSuccess?: CloudinaryUploadEventCallback;
	onTags?: CloudinaryUploadEventCallback;
	onUploadAdded?: CloudinaryUploadEventCallback;
	options?: CloudinaryUploadWidgetOptions;
	signatureEndpoint?: URL | RequestInfo;
	uploadPreset?: string;
	onAbortAction?: CloudinaryUploadEventAction;
	onBatchCancelledAction?: CloudinaryUploadEventAction;
	onCloseAction?: CloudinaryUploadEventAction;
	onDisplayChangedAction?: CloudinaryUploadEventAction;
	onPublicIdAction?: CloudinaryUploadEventAction;
	onQueuesEndAction?: CloudinaryUploadEventAction;
	onQueuesStartAction?: CloudinaryUploadEventAction;
	onRetryAction?: CloudinaryUploadEventAction;
	onShowCompletedAction?: CloudinaryUploadEventAction;
	onSourceChangedAction?: CloudinaryUploadEventAction;
	onSuccessAction?: CloudinaryUploadEventAction;
	onTagsAction?: CloudinaryUploadEventAction;
	onUploadAddedAction?: CloudinaryUploadEventAction;
}

export type CloudinaryUploadWidgetPropsChildren = {
	cloudinary: CloudinaryUploadWidgetCloudinaryInstance;
	widget: CloudinaryUploadWidgetWidgetInstance;
	error?: CloudinaryUploadWidgetError;
	isLoading?: boolean;
	results?: CloudinaryUploadWidgetResults;
} & CloudinaryUploadWidgetInstanceMethods;

export type CloudinaryUploadEventCallback = (
	results: CloudinaryUploadWidgetResults,
	widget: CloudinaryUploadEventCallbackWidget
) => void;
export type CloudinaryUploadEventAction = (results: CloudinaryUploadWidgetResults) => void;
export type CloudinaryUploadEventCallbackNoOptions = (
	results: CloudinaryUploadWidgetResults,
	widget: CloudinaryUploadWidgetWidgetInstance
) => void;
export type CloudinaryUploadEventCallbackWidgetOnly = (
	widget: CloudinaryUploadWidgetWidgetInstance
) => void;
export type CloudinaryUploadEventCallbackError = (
	error: CloudinaryUploadWidgetError,
	widget: CloudinaryUploadEventCallbackWidget
) => void;

export type CloudinaryUploadEventCallbackWidget = {
	widget: CloudinaryUploadWidgetWidgetInstance;
} & CloudinaryUploadWidgetInstanceMethods;
