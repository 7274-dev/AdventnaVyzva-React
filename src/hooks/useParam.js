const useParam = () => window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];

export { useParam }
