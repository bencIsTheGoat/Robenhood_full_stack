class User < ApplicationRecord
    validates :email, :password_digest, :session_token, :first_name, :last_name, :port_value, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true

    attr_reader :password

    after_initialize :ensure_session_token
    
    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

    def self.find_by_credentials(email, pw)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(pw)
        user
    end

    def is_password?(pw)
        crypt = BCrypt::Password.new(self.password_digest)
        crypt.is_password?(pw)
    end
end