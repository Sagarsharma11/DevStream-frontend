import React from 'react';
import Player from '../HomeComponents/Player/Player';

// Define the type for your props
interface ViewProps {
    setView: (view: boolean) => void; // A function that takes a string and returns void
    view: boolean; // The current view as a string
    data: any; // An array of any type, you can be more specific if you know the structure
}

const View: React.FC<ViewProps> = ({ setView, view, data }) => {
    // console.log(data);
    return (
        <div onClick={() => setView(false)} className="relative z-10  h-[22rem] sm:h-full" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="border-red-600 h-[22rem] sm:h-full fixed inset-0 bg-main-theme bg-opacity-0 sm:bg-opacity-75 sm:bg-gray-500 transition-opacity" aria-hidden="true">
            </div>

            <div className=" fixed inset-0 z-10 w-full overflow-y-auto  h-[22rem] sm:h-full">
            <div className="flex min-h-full items-start justify-center p-0 text-center sm:items-center lg:p-0">

                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl w-full top-0"
                    >
                        <div className="bg-main-theme px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex flex-col sm:items-start">
                                <Player data={data} />
                            </div>
                        </div>
                        <div className="bg-main-theme text-title-color px-6">
                            <small>{data.title}</small>
                        </div>
                        <div className="bg-main-theme px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button 
                                onClick={() => setView(false)} 
                                type="button" 
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
