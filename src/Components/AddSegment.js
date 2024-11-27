import { useState } from 'react'
import { toast } from 'react-toastify'

const AddSegment = ({ hide, heading }) => {
    const [selectedSegment, setSelectedSegment] = useState({})
    const [segment, setSegment] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const options = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]

    const SelectSegment = (e, selectedval) => {
        // console.log(e, "e");
        let schema = e.target.value;

        if (schema) {
            let key_name = schema.split(",");
            let newKey = key_name[0];
            let newValue = key_name[1];

            setSelectedSegment((prev) => {
                const updatedSegment = {};

                Object.keys(prev).forEach((key) => {
                    if (key === selectedval) {
                        updatedSegment[newKey] = newValue;
                    } else {
                        updatedSegment[key] = prev[key];
                    }
                });

                return updatedSegment;
            });

        }
    };



    const addNewSchema = () => {
        let schema_segment = document.getElementById('schema-segment')
        // console.log(schema_segment, "schema_segment")
        let obj = {}
        let schema = schema_segment.value

        if (schema) {
            let key_name = schema.split(",")
            obj[key_name[0]] = key_name[1]
            setSelectedSegment(prev => { return { ...prev, ...obj } })
            schema_segment.value = ''
        } else {
            toast.error('Please select a schema to add to segment')
        }
    }

    const save_segment = () => {
        setSubmitted(true)
        if (Object.keys(selectedSegment).length > 0 && segment) {
            const payload = {
                segment_name: segment,
                schema: [selectedSegment]
            }
            hide(payload)
            // console.log(selectedSegment, "selectedSegment")
        }
    }

    const blueBoxOptions = (selectedval) => {

        return options
            .filter((option) => {
                return !Object.keys(selectedSegment).includes(option.value) || option.value == selectedval;
            })
            .map((res) => (
                <option key={res.value} value={res.value + "," + res.label}>
                    {res.label}
                </option>
            ))
    }
    return (
        <>
            <header className='popup_head'>
                <div className='popup_head-parent'>
                    <img className='popup_head-parent-img' onClick={() => hide('')} src='/back-btn.jpg' />
                    <h1 className='popup_head-parent-title'>{heading}</h1>
                </div>
            </header>

            <div className='popup_body'>
                <div className='popup_body-section'>
                    <h6 className='popup_body-section-label'>Enter the Name of the Segment</h6>
                    <input type='text' onChange={(e) => setSegment(e.target.value)} name='segement_name' autoComplete='off' className='popup_body-section-input' />
                    {(submitted && !segment) && <p className='error-msg'>Segment name is required</p>}
                </div>

                <h6 className='popup_body-section-label'>To save your segment, you need to add the schemas to build the query</h6>

                <div className='popup_body-blue-box'>
                    {selectedSegment && Object.keys(selectedSegment).length > 0 ? <>
                        {Object.keys(selectedSegment).map((selectedval) => {
                            return (
                                <div key={selectedval} className="selectedValue">
                                    <select
                                        className="select-option"
                                        placeholder="Add schema to segment"
                                        value={selectedval + "," + selectedSegment[selectedval]}
                                        onChange={(e) => SelectSegment(e, selectedval)}
                                    >
                                        {blueBoxOptions(selectedval)}
                                    </select>
                                </div>
                            );
                        })}


                    </> : <>No Segment found!</>}
                </div>


                <div className=''>
                    <select className='select-option' id='schema-segment' placeholder="Add schema to segment" >
                        <option value="">Add schema to segment</option>
                        {options.filter(val => {
                            return !Object.keys(selectedSegment).includes(val.value)
                        })
                            .map(res => (
                                <option key={res.value} value={res.value + "," + res.label}>{res.label}</option>
                            ))}
                    </select>
                </div>


                <p className='add_new' onClick={addNewSchema}> + <span className=''>Add new schema</span></p>

            </div>

            <div className='popup_footer'>
                <div className='popup_footer-btns'>
                    <button className={`popup_footer-btns-save ${(Object.keys(selectedSegment).length > 0 && segment) ? '' : 'disabled-btn'}`} disabled={Object.keys(selectedSegment).length == 0 && !segment} onClick={save_segment}>Save the segment</button>
                    <button className='popup_footer-btns-cancel' onClick={() => hide('')}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default AddSegment
