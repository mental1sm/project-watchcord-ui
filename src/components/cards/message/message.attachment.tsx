import styles from './message.card.module.css'
import {MessageAttachment} from "../../../_model/Message.ts";
import {Image, Skeleton} from "@mantine/core";
import {modals} from "@mantine/modals";
import React, {useState} from "react";
import useWindowDimensions from "../../../hooks/UseWindowDimensions.ts";

export default function MessageAttachmentComponent({attachment}: {attachment: MessageAttachment}) {

    const imagePattern = 'image\/[a-zA-Z]*';
    const windowDimensions = useWindowDimensions();


    const downloadImage = () => {
        // @ts-ignore
        window.electronAPI.downloadImage(attachment.proxy_url, attachment.filename);
    };

    function optimalImageSize(width: number, height: number) {
        let optimalWidth;
        let optimalHeight;
        let difference;
        if (width > height) {
            optimalWidth = width > windowDimensions.width ? windowDimensions.width : width;
            difference = optimalWidth / width;
            optimalHeight = height * difference;
        } else {
            optimalHeight = height > windowDimensions.height ? windowDimensions.height : height;
            difference = optimalHeight / height;
            optimalWidth = height * difference;
        }
        return {
            width: optimalWidth,
            height: optimalHeight
        }
    }

    const imageAttachment = () => {
        const openImagePreview = () => modals.open({
            title: attachment.filename,
            size: "xl",
            className: styles.attachment_container,
            children: (
                <div>
                    <Image
                        onContextMenu={downloadImage}
                        fit={'contain'}
                        width={'auto'}
                        className={styles.attachment_modal_img}
                        // w={optimalImageSize(attachment.width, attachment.height).width}
                        // h={optimalImageSize(attachment.width, attachment.height).height}
                        p={5}
                        src={attachment.proxy_url}
                        fallbackSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU'}
                    />
                </div>
            )
        })

        return (
            <div onClick={openImagePreview} className={styles.msg_attachment}>
                <Image
                    pl={5}
                    pt={5}
                    loading={'eager'}
                    src={attachment.proxy_url}
                    fallbackSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU'}
                />
            </div>
        );
    }

    return (
        <>
            {attachment.content_type.match(imagePattern) ? imageAttachment() : null}
        </>
    );
}