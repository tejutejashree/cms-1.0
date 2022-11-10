
const regTemplate = (name,email) => {
    return `<div>
            <h1 style="color:slateblue;">Hi, ${name} Welcome to CMS-v1.0</h1>
            <article style="margin:auto;object-fit:cover;">
                <img src="https://media.istockphoto.com/id/628885264/vector/business-man-shaking-hands.jpg?s=612x612&w=0&k=20&c=gYB2kR5wurTNPFd7xNBz_qCpErUCjUrDnDPeak_Ztug=" width="300" height="300"/>
                <h4> We are excited to have you get started with mail id = 
                <span style="color:orangered;"> ${email} </span>, You account is ready to use.</h4>
            </article>

    </div>`
}
module.exports = regTemplate