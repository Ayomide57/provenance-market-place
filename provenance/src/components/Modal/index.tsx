const Modal = ({children}: any) => {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg backdrop-blur-xl bg-sky-700/10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="backdrop-blur-xl bg-sky-700/70 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;