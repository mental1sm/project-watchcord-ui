import styles from './message.card.module.css'
import {MessageAttachment} from "../../../_model/Message.ts";
import {Image, Skeleton} from "@mantine/core";
import {modals} from "@mantine/modals";
import React, {useState} from "react";

export default function MessageAttachmentComponent({attachment}: {attachment: MessageAttachment}) {

    const imagePattern = 'image\/[a-zA-Z]*';

    const downloadImage = () => {
        // @ts-ignore
        window.electronAPI.downloadImage(attachment.proxy_url, attachment.filename);
    };

    const imageAttachment = () => {
        const openImagePreview = () => modals.open({
            title: attachment.filename,
            size: attachment.width,
            children: (
                <div>
                    <Image
                        onContextMenu={downloadImage}
                        mah={'80vh'}
                        maw={attachment.width}
                        pl={5}
                        pt={5}
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