import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';

const HootForm= ()=>{
    const {hootId}= useParams();

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId);
            setFormData(hootData);
        };
        if (hootId) fetchHoot();
    }, [hootId]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (hootId) {
            props.handleUpdateHoot(hootId, formData);
        } else {props.handleAddHoot(formData);
        }
    };
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1>
            </form>
            </main>
    )
                };

export default HootForm;