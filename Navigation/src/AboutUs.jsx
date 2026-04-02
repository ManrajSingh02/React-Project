function AboutUs() {
  return (
    <div className="min-h-[70vh] bg-purple-100 flex items-center justify-center rounded-2xl">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center  max-w-md ">
        <h2 className="text-2xl font-bold mb-3">About Us</h2>

        <p className="text-gray-600 mb-5">
          We are passionate developers who build simple and modern websites.
        </p>

        <div className="flex justify-center gap-3">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 cursor-pointer">
            Learn More
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
