import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface User {
  username: string;
  email: string;
  id: number;
  status: string;
  gender: string;

}
function Dasboard() {
  const [data, setData] = useState<User[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('');


  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };
  const handleSubmit = async (userId: number) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}/gender`, selectedGender);
      console.log('Cinsiyet güncelleme başarılı');
    } catch (error) {
      console.error('Cinsiyet güncelleme başarısız:', error);
    }
  };
  return (


    <div className="relative overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              ASDAS
            </th>
            <th scope="col" className="px-6 py-3">
              Cinsiyet Seç
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((user, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} border-b dark:border-gray-700`}>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {user.username}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {user.id}
              </td>
              <td className="px-6 py-4">
                {user.gender}
              </td>
              <td className="px-6 py-4">
                <select value={selectedGender} onChange={handleGenderChange}>
                  <option value="">Cinsiyet Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                </select>
                <button onClick={() => handleSubmit(user.id)}>Gönder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Dasboard