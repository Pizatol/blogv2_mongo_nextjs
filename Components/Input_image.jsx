import React, { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject,
} from "firebase/storage";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";
import Image from "next/image";
import css from "../styles/Components/Input_image.module.scss";

export default function Input_image({
    imageUrls,
    setImageUrls,
    imageUpload,
    setImageUpload,
}) {
    // const [imageUpload, setImageUpload] = useState([]);
    // const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");

    // UPLOAD

    const uploadFile = () => {
        if (imageUpload == null) return;

        const name = imageUpload.name + v4();
        const imageRef = ref(storage, `images/${name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, { url: url, name: name }]);
            });
        });
    };

    //  input file => imageUpload => setImageUrls => display global : imageUrls

    // DELETE
    const deleteImg = (e) => {
        const imageSelectRef = ref(storage, `/images/${e.name}`);

     
        deleteObject(imageSelectRef)
            .then(() => {
                const filterArr = imageUrls.filter(
                    (item) => item.name !== e.name
                );
                
                setImageUrls(filterArr);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div>
        {imageUrls.length <= 2 ? (

            <div>
                <input
                    type="file"
                    onChange={(event) => {
                        // IMAGEUPLOAD
                        setImageUpload(event.target.files[0]);
                    }}
                />
                <button type="button" onClick={uploadFile}>
                    {" "}
                    Upload Image
                </button>
            </div>
         ) : ""}
          

            <div className={css.images_container}>
                {imageUrls
                    ? imageUrls.map((img, index) => {
                          return (
                              <div key={index} className={css.image_container}>
                                  <Image
                                      className={css.image}
                                      src={img.url}
                                      alt="image"
                                      fill
                                  />

                                  <button
                                      type="button"
                                      className={css.delete_button}
                                      onClick={() => deleteImg(img)}
                                  >
                                      DELETE
                                  </button>
                              </div>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
}
