import React, { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import exportfirebase from './firebase';
import './List.css';

const List = () => {
    const [item, setItem] = useState([]); 
    const [newItem, setNewItem] = useState({ type: 'question', title: '', tag: '', abstract: '' });
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(exportfirebase.postUpload, 'item'), (snapshot) => {
            const fetched_Items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItem(fetched_Items);
            setLoad(false); 
        }, (error) => {
            console.error("Error fetching items: ", error);
            setError("Failed to load items");
            setLoad(false);
        });

        return () => unsubscribe(); 
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(exportfirebase.postUpload, 'item'), {
                ...newItem,
                tag: newItem.tag.split(',').map(tag => tag.trim()),
                timestamp: new Date(),
            });
            setNewItem({ type: 'question', title: '', tag: '', date: '' }); 
        } catch (error) {
            setError('Error adding item: ');
            console.error(error.message)
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteDoc(doc(exportfirebase.postUpload, 'item', id));
        } catch (error) {
            setError('Error deleting item: ');
            console.error(error.message)
        }
    };

    const filteredItems = useMemo(() => {
        if(filter === ''){
            return item;
        }

        return item.filter(items => {
            const titlematching = items.title.toLowerCase().includes(filter.toLowerCase()) ;
            const tagmatchihng =  items.tag.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));

            return titlematching || tagmatchihng;
        });
    },[item, filter]);

    if (load) return <p>Loading items...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className='container'>
            <div className="list">
                <h3>Find by Tag or Title </h3>
                <input
                    type="text"
                    placeholder="Filter by title or tag"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

                <div className='container'>
                    <div className="items">
                        {filteredItems.map(item => (
                            <div key={item.id} className="card">
                                <h4 onClick={() => setSelected(selected === item.id ? null : item.id)}>
                                    {item.title}
                                </h4>
                                {selected === item.id && (
                                    <div className="details-area">
                                        <p>{item.abstract}</p>
                                        <p>Type: {item.type}</p>
                                        <p>Tags: {item.tag.join(', ')}</p>
                                        <p>Date: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</p>
                                        <button onClick={() => handleDeleteItem(item.id)} className='button-area-submit'>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleAddItem} >
                    <input
                        type='text'
                        name='title'
                        placeholder="Enter title"
                        value={newItem.title}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type='text' 
                        name='abstract'
                        placeholder="Enter abstract"
                        value={newItem.abstract}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type='text'
                        name='tag'
                        placeholder="Enter tags (comma-separated)"
                        value={newItem.tag}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" className='button-area-submit'>Add Item</button>
                </form>
            </div>
        </div>
    );
};

export default List;