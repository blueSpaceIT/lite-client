import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import "./ProductShortPDFModal.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const ProductShortPDFModal = ({ pdfUrl }: { pdfUrl: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState<number>(0);

    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
                className={
                    "text-xs text-white bg-primary rounded-lg px-3 py-2 cursor-pointer"
                }
            >
                একটু পড়ে দেখুন
            </Button>

            <Dialog
                open={isOpen}
                as="div"
                className="relative z-40 focus:outline-none"
                onClose={() => setIsOpen(false)}
            >
                <div className="fixed inset-0 z-50 w-screen bg-black/40 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-rose-600"
                            >
                                একটু পড়ে দেখুন
                            </DialogTitle>

                            <div className="min-h-[60vh]">
                                <Document
                                    file={pdfUrl}
                                    onLoadSuccess={({ numPages }) =>
                                        setNumPages(numPages)
                                    }
                                >
                                    {Array.from(
                                        new Array(numPages),
                                        (_, index) => (
                                            <Page
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                                // width={100%}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                            />
                                        )
                                    )}
                                </Document>
                                {/* <iframe
                                    src={pdfUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: "none" }}
                                    allowFullScreen
                                /> */}
                                {/* <div style={{ display: "grid" }}>
                                    <iframe
                                        src={pdfUrl}
                                        style={{
                                            border: "none",
                                            flex: 1,
                                            width: "100%",
                                            height: "100%",
                                            display: "grid",
                                        }}
                                        allowFullScreen
                                    />
                                </div> */}
                            </div>

                            <div className="flex justify-end items-center gap-2 mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-slate-200 px-3 py-1.5 text-sm/6 font-semibold text-slate-700 shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ProductShortPDFModal;
