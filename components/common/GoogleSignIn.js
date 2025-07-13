// GoogleLoginButton.js
const GoogleLoginButton = () => {
    return (
      <div className="flex justify-center">
        <button
          type="button"
          className="flex items-center justify-center w-full py-2 space-x-2 bg-white border-2 rounded-md border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
          onClick={() => {
            // Add your Google login logic here
            console.log("Login with Google clicked");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.14 0 5.97 1.2 8.18 3.14l6.1-6.1C34.2 3.2 29.4 1 24 1 14.8 1 7.1 6.6 3.9 14.1l7.3 5.7C13.1 13.2 18.1 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24c0-1.6-.2-3.2-.5-4.7H24v9.4h12.7c-.6 3.2-2.5 5.9-5.2 7.7l7.9 6.1c4.6-4.2 7.1-10.4 7.1-18.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.2 28.8c-.8-2.4-.8-5.2 0-7.6l-7.3-5.7C.3 19.4 0 21.7 0 24c0 2.3.3 4.6.9 6.8l7.3-5.7z"
            />
            <path
              fill="#4285F4"
              d="M24 46c5.4 0 10-1.8 13.4-4.9l-7.9-6.1c-2.2 1.5-5 2.4-8.1 2.4-5.9 0-10.9-3.7-12.7-8.8l-7.3 5.7C7.1 41.4 14.8 46 24 46z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          <span>Login with Google</span>
        </button>
      </div>
    );
  };
  
  export default GoogleLoginButton;