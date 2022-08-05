import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from '../api/users.js';

const registerTemplate = (onSubmit) => html`
        <section id="register-page" class="content auth">
            <form id="register">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>
        
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">
        
                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">
        
                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">
        
                    <input class="btn submit" type="submit" value="Register">
        
                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>
        
        <!-- Create Page ( Only for logged-in users ) -->
        <section id="create-page" class="auth">
            <form @submit=${onSubmit} id="create">
                <div class="container">
        
                    <h1>Create Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title...">
        
                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category...">
        
                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
        
                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
        
                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Create Game">
                </div>
            </form>
        </section>`;

export function registerView(context) {
    context.render(registerTemplate(onSubmit))
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();



        if (email == '' || password == '') {
            return alert('All fields are required');
        }

        if (password != repass) {
            return alert('Passwords don\'t match');
        }

        await register(email, password);
        context.updateNav();
        context.page.redirect('/');

    }
}