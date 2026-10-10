const db = require('./db');

async function setup() {
  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('name').notNullable();
      t.string('email').notNullable().unique();
      t.string('password').notNullable();
    });
  }

  if (!(await db.schema.hasTable('templates'))) {
    await db.schema.createTable('templates', (t) => {
      t.increments('id').primary();
      t.string('name').notNullable();
      t.text('description');
      t.string('thumbnail_url');
      t.string('category');
    });
  }

  if (!(await db.schema.hasTable('favorites'))) {
    await db.schema.createTable('favorites', (t) => {
      t.increments('id').primary();
      t.integer('user_id').notNullable().references('users.id');
      t.integer('template_id').notNullable().references('templates.id');
      t.unique(['user_id', 'template_id']);
    });
  }

  const count = await db('templates').count({ c: '*' }).first();
  if (count.c === 0) {
    await db('templates').insert([
      { name: 'Modern Portfolio', description: 'Clean portfolio template for developers.', thumbnail_url: 'https://picsum.photos/seed/portfolio/400/250', category: 'Portfolio' },
      { name: 'SaaS Landing Page', description: 'High-converting landing page for SaaS products.', thumbnail_url: 'https://picsum.photos/seed/saas/400/250', category: 'Landing Page' },
      { name: 'Admin Dashboard', description: 'Responsive dashboard with charts and tables.', thumbnail_url: 'https://picsum.photos/seed/dashboard/400/250', category: 'Dashboard' },
      { name: 'Online Store', description: 'E-commerce template with product grid and cart.', thumbnail_url: 'https://picsum.photos/seed/store/400/250', category: 'E-commerce' },
      { name: 'Personal Blog', description: 'Minimal blog layout focused on reading.', thumbnail_url: 'https://picsum.photos/seed/blog/400/250', category: 'Blog' },
      { name: 'Startup One-Pager', description: 'Simple one-page site for early startups.', thumbnail_url: 'https://picsum.photos/seed/startup/400/250', category: 'Landing Page' },
    ]);
    console.log('Seeded 6 templates');
  } else {
    console.log('Templates already exist, skipping seed');
  }

  await db.destroy();
}

setup().catch((err) => {
  console.error(err);
  process.exit(1);
});