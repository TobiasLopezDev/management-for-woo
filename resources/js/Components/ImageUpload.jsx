import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { ContextMenu, ContextMenuItem } from '@/Components/ui/context-menu';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import Cropper from 'react-easy-crop'; // Cropper library for image cropping

export default function ImageUpload() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null); // Store the actual file for cropping
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1); // Default aspect ratio (1:1)

    // Open the file selector
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageFile(file);
            setIsDialogOpen(true); // Open dialog to show and crop the image
        }
    };

    // Open the file selector when clicking on the context menu
    const handleUploadClick = () => {
        document.getElementById('imageUploader').click();
    };

    // Handle cropping adjustments
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels); // Logs cropped area for further use
    };

    return (
        <div className="flex flex-col items-center">
            {/* Context menu for uploading an image */}
            <ContextMenu trigger={
                <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center border border-dashed border-gray-400">
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Selected image"
                            className="object-cover w-full h-full"
                            onClick={() => setIsDialogOpen(true)}
                        />
                    ) : (
                        <span className="text-gray-500">Upload Image</span>
                    )}
                </div>
            }>
                <ContextMenuItem onClick={handleUploadClick}>
                    {selectedImage ? "Replace Image" : "Upload Image"}
                </ContextMenuItem>
            </ContextMenu>

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                id="imageUploader"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />

            {/* Dialog to show and crop the selected image */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    {selectedImage && (
                        <div className="relative w-full h-96">
                            <Cropper
                                image={selectedImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect} // Aspect ratio for cropping
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}
                    {/* Buttons to close dialog or select aspect ratio */}
                    <div className="flex space-x-4 mt-4">
                        <Button onClick={() => setIsDialogOpen(false)} className="bg-red-500 text-white">
                            Close
                        </Button>
                        <Button onClick={() => setAspect(1)}>1:1</Button>
                        <Button onClick={() => setAspect(16 / 9)}>16:9</Button>
                        <Button onClick={() => setAspect(4 / 3)}>4:3</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
