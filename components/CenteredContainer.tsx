const CenteredContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default CenteredContainer;
