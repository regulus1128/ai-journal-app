import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateResponse } from '../features/journalSlice';
import { useNavigate } from 'react-router-dom';

const NewJournalEntry = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode } = useSelector((state) => state.darkMode);

    const [journalData, setJournalData] = useState({
        title: "",
        text: ""
    });
    const { isLoading } = useSelector(state => state.journal);
    

    const handleChange = (e) => {
        setJournalData({ ...journalData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await dispatch(generateResponse(journalData)).unwrap();
            // console.log(res);
            const journalId = res.entry._id;
            navigate(`/journal/${journalId}`); // Redirect to the journal entry page
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${mode ? "bg-gray-900" : "bg-gray-50"}`}>
  <div className="w-full max-w-md">
    <form onSubmit={handleSubmit} className={`transition-colors duration-300 ${mode ? "bg-gray-800/70 border-gray-700/50" : "bg-white/70"} rounded-lg shadow-md p-6 space-y-6`}>

      <div className="space-y-2">
        <label className={`block text-md font-medium ${mode ? "text-gray-300" : "text-gray-600"}`}>Title</label>
        <input
          type='text'
          name='title'
          value={journalData.title}
          onChange={handleChange}
          placeholder="Give a title"
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${mode ? "text-gray-300 placeholder-gray-500 bg-gray-800" : "text-gray-600 placeholder-gray-400 bg-white"}`}
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-md font-medium ${mode ? "text-gray-300" : "text-gray-600"}`}>Journal Text</label>
        <textarea
          placeholder="Write your thoughts here..."
          name='text'
          value={journalData.text}
          onChange={handleChange}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none ${mode ? "text-gray-300 placeholder-gray-500 bg-gray-800" : "text-gray-600 placeholder-gray-400 bg-white"}`}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 nunito-sans"
      >
        {isLoading ? "Generating..." : "Add"}
      </button>
    </form>
  </div>
</div>

  )
}

export default NewJournalEntry