import { useState } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Warning from './components/Warning';


export default function App() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!file || !job) {
      alert('Please upload a resume and enter the job description.');
      return;
    }

    setLoading(true);

    try {
      // 1) UPLOAD PDF → extract text
      const formData = new FormData();
      formData.append('resume', file);

      const uploadRes = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const resumeText = uploadData.text;

      // 2) SEND TEXT + JOB → rewrite
      const rewriteRes = await fetch('http://localhost:8000/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: resumeText,
          job,
        }),
      });

      const rewriteData = await rewriteRes.json();
      setOutput(rewriteData);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <Navbar />
      <Warning/>
      <Body />
    </div>
  );
}
