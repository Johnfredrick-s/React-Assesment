import { lazy, Suspense, useState } from 'react';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddSegment = lazy(() => import('./Components/AddSegment'))

function App() {
  const [visible, setVisible] = useState(false);

  const hide = (data) => {
    setVisible(false);
    if (data) {
      getSegments(data)
    }
  }

  const getSegments = async (params) => {
    const url = "https://webhook.site/660c8134-20bf-4f0b-85b3-e9885291c28e"
    const response = await fetch(url,{method:'POST',headers:{'Content-Type':'Application/json'},body:JSON.stringify(params)});
    const data = await response.json();
    console.log(data)
    if(data.status == "Success" && data.message){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }

  return (
    <>
    <ToastContainer position='bottom-right' autoClose={2000}  />
      {visible && <Rodal visible={visible} animation="slideRight" onClose={()=> hide('')} width={300} height={200}>
        <Suspense fallback={'Loading'}>
          <AddSegment hide={hide} heading={'Saving segment'} />
        </Suspense>
      </Rodal>}

      <main className="main_width py-5">
        <div>
          <button onClick={()=> setVisible(true)} className="save_segment">Save segment</button>
        </div>
      </main>
    </>
  );
}

export default App;
