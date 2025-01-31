import { useState, useEffect } from "react"


export default function ModalForm({ isOpen , onClose, mode, onSubmit,clientData}) {

    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState(false);

    const handleStatsChange = (e) => {
        setStatus(e.target.value === 'Active');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const clientData = { name, email, job, rate: Number(rate), isActive: status }
            await onSubmit(clientData)
            onClose();
        } catch (err) {
            console.error("Error adding client", err);
        }

    }



    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setName(clientData.name);
            setEmail(clientData.email);
            setJob(clientData.job);
            setRate(clientData.rate);
            setStatus(clientData.isActive); // Assuming isActive is a boolean
        } else {
            // Reset fields when adding a new client
            setName('');
            setEmail('');
            setJob('');
            setRate('');
            setStatus(false);
        }
    }, [mode, clientData]);

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">{mode === "edit" ? "Edit Client" : "Client Details"}</h3>
                    <form noValidate onSubmit={handleSubmit}>
                        {/* if there is a button in form, it will close the modal */}
                        <label className="input input-bordered flex items-center my-4 gap-2">
                            Name
                            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center my-4 gap-2">
                            Email
                            <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center my-4 gap-2">
                            Job
                            <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
                        </label>
                        <div className="flex mb-4 my-4justify-between">
                            <label className="input input-bordered mr-4 flex items-center gap-2">
                                Rate
                                <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} />
                            </label>
                            <select value={status ? 'Active' : 'Inactive'} className="select select-bordered w-full  max-w-xs" onChange={handleStatsChange}>
                                <option>Inactive</option>
                                <option>Active </option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">
                            {mode === "edit" ? "Save changes" : "Add client"}
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )


}