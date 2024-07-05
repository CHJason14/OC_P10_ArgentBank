import React from 'react'
import Banner from '../components/Banner'
import Article from '../components/Article'
import IconChat from '../assets/icon-chat.png'
import IconMoney from '../assets/icon-money.png'
import IconSecurity from '../assets/icon-security.png'
import '../styles/style.css'

export default function HomePage() {
    return <>
    <Banner />
    <section className="features">
        <h2 className="sr-only">Features</h2>
        <Article img={IconChat} alt="Chat Icon" title="You are our #1 priority" text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
        <Article img={IconMoney} alt="Chat Icon" title="More savings means higher rates" text="The more you save with us, the higher your interest rate will be!" />
        <Article img={IconSecurity} alt="Chat Icon" title="Security you can trust" text="We use top of the line encryption to make sure your data and money is always safe." />
    </section>
    </>
}
