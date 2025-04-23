import toast, { Toast, ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading' | 'default';

interface UseToastOptions {
  defaultDuration?: number;
  defaultPosition?: ToastOptions['position'];
}

export function useToast(options: UseToastOptions = {}) {
  const { 
    defaultDuration = 4000,
    defaultPosition = 'top-right'
  } = options;

  const showToast = (message: string, type: ToastType = 'default', options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
      duration: defaultDuration,
      position: defaultPosition,
      ...options
    };
    
    switch (type) {
      case 'success':
        return toast.success(message, defaultOptions);
      case 'error':
        return toast.error(message, defaultOptions);
      case 'loading':
        return toast.loading(message, defaultOptions);
      default:
        return toast(message, defaultOptions);
    }
  };

  const dismissToast = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const updateToast = (toastId: string | number, message: string, options?: ToastOptions) => {
    return toast.custom((t: Toast) => {
      if (t.id === toastId) {
        return (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{message}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        );
      }
    }, options);
  };

  return {
    showToast,
    dismissToast,
    updateToast,
    success: (message: string, options?: ToastOptions) => showToast(message, 'success', options),
    error: (message: string, options?: ToastOptions) => showToast(message, 'error', options),
    loading: (message: string, options?: ToastOptions) => showToast(message, 'loading', options)
  };
}
