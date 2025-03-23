import React, { useState } from 'react';
import axios from 'axios';
import { FiPaperclip, FiSend, FiTrash2, FiX } from 'react-icons/fi';

const SendEmail = () => {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAttachmentChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  const removeAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const handleSend = async () => {
    if (!to || !subject || !content) {
      setMessage({ type: 'error', text: 'To, Subject, and Email body are required!' });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('body', content);
    attachments.forEach((file) => formData.append('attachments', file));

    try {
      await axios.post('http://localhost:5000/send-email', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Email sent successfully!' });
      handleDiscard();
      alert("Email sent successfully ☺️")
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send email. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setTo('');
    setCc('');
    setBcc('');
    setSubject('');
    setContent('');
    setAttachments([]);
    setMessage(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#283739] shadow-lg rounded-lg p-6 mt-14 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-[#3baea0]">Compose Email</h2>
      {message && (
        <p className={`p-2 mb-2 text-center ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>{message.text}</p>
      )}

      <input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="w-full p-2 border rounded bg-[#35495e] text-white mb-2" />
      <input type="email" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="Cc (Optional)" className="w-full p-2 border rounded bg-[#35495e] text-white mb-2" />
      <input type="email" value={bcc} onChange={(e) => setBcc(e.target.value)} placeholder="Bcc (Optional)" className="w-full p-2 border rounded bg-[#35495e] text-white mb-2" />
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full p-2 border rounded bg-[#35495e] text-white mb-2" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your email..." className="w-full p-2 border rounded bg-[#35495e] text-white mb-4 h-40" />

      <label className="flex items-center space-x-2 cursor-pointer text-[#3baea0]">
        <FiPaperclip />
        <input type="file" multiple className="hidden" onChange={handleAttachmentChange} />
        <span>Attach files</span>
      </label>

      {attachments.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-[#118a7e]">Attachments:</p>
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center justify-between text-sm text-white bg-[#1f2f3d] p-1 rounded mt-1">
              <span>{file.name}</span>
              <button onClick={() => removeAttachment(index)} className="text-red-500 hover:text-red-700">
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-4">
        <button onClick={handleDiscard} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded">
          <FiTrash2 />
        </button>
        <button onClick={handleSend} disabled={loading} className="p-2 bg-[#118a7e] hover:bg-[#1f6f78] text-white rounded flex items-center">
          {loading ? 'Sending...' : <><FiSend className="mr-1" /> Send</>}
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
